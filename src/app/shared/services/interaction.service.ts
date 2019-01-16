import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private sendSource = new Subject<any>();
  servicesURL = "http://localhost:4200";

  getSource$ = this.sendSource.asObservable();

  constructor(private http: HttpClient) { }

  send(data: any) {
    this.sendSource.next(data);
  }

  getServices(): Observable<any> {
    // console.log(this.http.get(this.servicesURL));
    return this.http.get(this.servicesURL);
  }
}
