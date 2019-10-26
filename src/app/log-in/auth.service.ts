import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    apiAddress = 'https://localhost:5001/';
    constructor(private router: Router, private httpClient: HttpClient) {}
    LogIn(email: string, password: string) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(this.apiAddress + 'account/login', {
            Email: email,
            Password: password
            }, {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    Logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
    }
    Register(name: string, email: string, password: string, role: string) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(this.apiAddress + 'account/register', {
            Name: name,
            Email: email,
            Password: password,
            Role: role
            }, {headers: reqHeader})
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }
    errorHandler(error: any): void {
        console.log(error);
    }
}
