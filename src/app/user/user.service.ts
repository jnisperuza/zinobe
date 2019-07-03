import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app-settings';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    private getUrlApi() {
        return AppSettings.URLAPI;
    }

    private getHeader(options?: object) {
        const contentType = options && options['contentType'] || 'application/json';
        const headers = new HttpHeaders()
            .append('Content-Type', contentType)
        return headers;
    }

    public getUsers() {
        return this.httpClient.get(this.getUrlApi() + 'users');
    }

    public getUserDni(dni) {
        return this.httpClient.get(this.getUrlApi() + 'users/' + dni);
    }

    public saveUser(data) {
        return this.httpClient.post(this.getUrlApi() + 'users/', data, {
            headers: this.getHeader()
        });
    }

}
