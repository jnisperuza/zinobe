import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app-settings';

@Injectable()
export class RequestService {

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

    public getLoans() {
        return this.httpClient.get(this.getUrlApi() + 'loans');
    }

    public getPendingLoans() {
        return this.httpClient.get(this.getUrlApi() + 'loans/pending');
    }

    public getNegatedLoans() {
        return this.httpClient.get(this.getUrlApi() + 'loans/negated');
    }

    public getLoansUserId(userId) {
        return this.httpClient.get(this.getUrlApi() + 'loans/user/' + userId);
    }

    public saveLoan(data) {
        return this.httpClient.post(this.getUrlApi() + 'loans/', data, {
            headers: this.getHeader()
        });
    }

}
