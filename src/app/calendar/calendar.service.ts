import { Injectable } from '@angular/core';
import { CalendarEvent, LogIn, CreateHotelForm } from 'calendar-utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class CalendarService {
    constructor(private httpClient: HttpClient) {}
    apiAddress = 'https://localhost:5001/';
    hotelForms() {
        return this.httpClient.get<any>(this.apiAddress + 'bookingforms/hotelbookingforms')
        .pipe(map((res) => {
            return res;
        }))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    invidualForms() {
        return this.httpClient.get<any>(this.apiAddress + 'bookingforms/individualbookingforms')
        .pipe(map((res) => {
            return res;
        }))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    getTours() {
        return this.httpClient.get<any>(this.apiAddress + 'tour/tours')
        .pipe(map((res) => {
            return res;
        }))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    errorHandler(error: any): void {
        console.log(error);
    }
    SaveEvent(EventToSave) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`,
        EventToSave,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    DeleteEvent(Id) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.delete<any>(`${this.apiAddress}bookingforms/individualDelete/` + Id, {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    UpdateEvent(EventToUpdate) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.put<any>(`${this.apiAddress}bookingforms/createhotelbook`,
        EventToUpdate,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    SubmitHotel(SavingItem) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(`${this.apiAddress}hotel/createhotel`,
        SavingItem,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    SubmitTrip(SavingItem) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(`${this.apiAddress}tour/createtour`,
        SavingItem,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    SubmitTransfer(SavingItem) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(`${this.apiAddress}transfer/create`,
        SavingItem,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    DeleteHotel(Id) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.delete<any>(`${this.apiAddress}hotel/${Id}`,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    DeleteTrip(Id) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.delete<any>(`${this.apiAddress}tour/${Id}`,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    DeleteTransfer(Id) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.delete<any>(`${this.apiAddress}transfer/${Id}`,
        {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

}
