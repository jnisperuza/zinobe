import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app-settings';

@Injectable()
export class SimulatorService {

    constructor(private httpClient: HttpClient) { }

    getUrlApi() {
        return AppSettings.URLAPI;
    }

}
