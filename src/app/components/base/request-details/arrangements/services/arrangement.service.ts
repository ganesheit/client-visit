import { Injectable } from "@angular/core";
import { Arrangement } from "../models/arrangement";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { ArrangementResponse } from "../models/arrangementResponse";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ArrangementService {
    arrangements: ArrangementResponse[];
    private baseUrl = 'http://localhost:8085/api/arrangement';

    constructor(private httpClient: HttpClient) {
        
    }

    addArrangement(id: string, arrangement: Arrangement) {
        let url = this.baseUrl;
        switch(arrangement.arrangementType) {
            case 'vehicle':
                url += '/vehicle';
                break;
            case 'food':
                url += '/food';
                break;
            case 'event':
                url += '/event';
                break;
        }
        return this.httpClient.post(url, arrangement, {
            params: {
                clientVisitId: id
            }
        })
    }

    editArrangement(id: string, arrangement: Arrangement) {
        let url = this.baseUrl;
        switch(arrangement.arrangementType) {
            case 'vehicle':
                url += '/vehicle';
                break;
            case 'food':
                url += '/food';
                break;
            case 'event':
                url += '/event';
                break;
        }
        return this.httpClient.put(url, arrangement, {
            params: {
                clientVisitId: id
            }
        })
    }

    deleteArrangement(arrangement: Arrangement) {
        let url = this.baseUrl;
        switch(arrangement.arrangementType) {
            case 'vehicle':
                url += '/vehicle';
                break;
            case 'food':
                url += '/food';
                break;
            case 'event':
                url += '/event';
                break;
        }
        return this.httpClient.delete(`${url}/${arrangement.id}`)
    }


    get(id: string) {
        return this.httpClient.get(`${this.baseUrl}/clientVisit/${id}`).pipe(tap((response: ArrangementResponse[]) => {
            this.arrangements = response;
        }));
    }
}