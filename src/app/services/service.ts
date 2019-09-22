import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Service {

  constructor(
    private _Http: HttpClient
  ) { }

  GetRequest<T>(url): Observable<T> {
    return this._Http.get<T>(url);
  }
  
}
