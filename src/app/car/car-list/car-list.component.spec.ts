/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { faker } from "@faker-js/faker";
import { of } from "rxjs";

import { CarListComponent } from "./car-list.component";
import { CarService } from "../car.service";
import { Car } from "../car";

describe("CarListComponent", () => {
  let debug: DebugElement;
  let fixture: ComponentFixture<CarListComponent>;
  let component: CarListComponent;
  let cardService: CarService;
  let carsMock: Array<Car> = [];
  let geCarsSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CarListComponent],
      providers: [CarService],
    }).compileComponents();
  }));

  beforeEach(() => {
    carsMock = [];

    for (let i = 0; i < 3; i++) {
      const car = new Car(
        faker.number.int({ min: 10, max: 100 }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.number.int({ min: 1990, max: 2025 }),
        faker.number.int({ min: 1, max: 999999 }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } })
      );
      carsMock.push(car);
    }

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CarService);
    geCarsSpy = spyOn(cardService, "geCars").and.returnValue(of(carsMock));
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display table with correct number of rows (3 cars) and (1 header)", () => {
    const tableRows = debug.queryAll(By.css("tbody tr"));
    expect(tableRows.length).toBe(3);
    const headerRow = debug.queryAll(By.css("thead tr"));
    expect(headerRow.length).toBe(1);
  });

  it("should call carService.geCars when getCars is called", () => {
    geCarsSpy.calls.reset();
    component.getCars();
    expect(geCarsSpy).toHaveBeenCalledTimes(1);
  });

  it("should correctly calculate brand totals", () => {
    const mockCars = [
      new Car(1, "Mazda", "3", "Sedán", 2020, 100, "img", "desc"),
      new Car(2, "Mazda", "CX5", "SUV", 2022, 200, "img", "desc"),
      new Car(3, "Toyota", "Corolla", "Sedán", 2021, 300, "img", "desc"),
    ];
    component.cars = mockCars;
    component.calculateBrandTotals();

    expect(component.brandTotals["Mazda"]).toBe(2);
    expect(component.brandTotals["Toyota"]).toBe(1);
    expect(Object.keys(component.brandTotals).length).toBe(2);
  });

  it("should render brand totals in the template", () => {
    component.brandTotals = { Mazda: 2, Toyota: 1 };
    fixture.detectChanges();

    const allDivs = debug.queryAll(By.css("div"));
    const totalDivs = allDivs.filter(d => d.nativeElement.textContent.includes("Total"));

    const texts = totalDivs.map(d => d.nativeElement.textContent.trim());
    const joined = texts.join(" ");

    expect(joined).toContain("Total Mazda: 2");
    expect(joined).toContain("Total Toyota: 1");
  });
});
