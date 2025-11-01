import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Car } from "./car";

@Injectable({
  providedIn: "root",
})
export class CarService {
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  geCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
}
