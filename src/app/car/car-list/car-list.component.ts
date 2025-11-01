import { Component, OnInit } from "@angular/core";
import { Car } from "../car";
import { CarService } from "../car.service";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.css"],
})
export class CarListComponent implements OnInit {
  cars: Array<Car> = [];
  brandTotals: { [brand: string]: number } = {};

  constructor(private carService: CarService) {}

  getCars() {
    this.carService.geCars().subscribe((cars) => {
      this.cars = cars;
      this.calculateBrandTotals();
    });
  }

  calculateBrandTotals() {
    this.brandTotals = {};
    this.cars.forEach((car) => {
      if (!this.brandTotals[car.marca]) {
        this.brandTotals[car.marca] = 1;
      } else {
        this.brandTotals[car.marca]++;
      }
    });
  }

  getBrandKeys() {
    return Object.keys(this.brandTotals);
  }

  ngOnInit() {
    this.getCars();
  }
}
