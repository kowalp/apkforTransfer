import { Injectable } from '@angular/core';
import { CalendarEvent, CreateHotelForm } from 'calendar-utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class MainService {
    constructor(private httpClient: HttpClient) {}
    apiAddress = 'https://localhost:5001/';
    sendForNow(form: {}) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`, form,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    errorHandler(error: any): void {
        console.log(error);
    }

    SendForLater(arrivalTime: Date, departureTime: Date, personCount: string, trip: string, transfer: string,
                 phone: string, name: string, email: string) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`,
        {
            ArrivalTime: arrivalTime,
            DepartureTime: departureTime,
            PersonCount: personCount,
            Trip: trip,
            Transfer: transfer,
            Phone: phone,
            Name: name,
            Email: email
        },
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    GetHotels() {
        return this.httpClient.get<CalendarEvent[]>(this.apiAddress + 'hotel/hotels')
        .pipe(map((res) => {
            const data = res;
            return data;
        }))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    GetTrips() {
        return this.httpClient.get<CalendarEvent[]>(this.apiAddress + 'tour/tours')
        .pipe(map((res) => {
            const data = res;
            return data;
        }))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    GetTours() {
        return this.httpClient.get<CalendarEvent[]>(this.apiAddress + 'transfer/transfers')
        .pipe(map((res) => {
            const data = res;
            return data;
        }))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

}
