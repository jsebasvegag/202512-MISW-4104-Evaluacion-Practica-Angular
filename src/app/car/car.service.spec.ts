/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CarService } from './car.service';

describe('Service: Car', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });
  });

  it('should ...', inject([CarService], (service: CarService) => {
    expect(service).toBeTruthy();
  }));
});
