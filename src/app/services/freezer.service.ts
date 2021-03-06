import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Freezer } from '../models/freezer.model';

const baseUrl = 'http://localhost:8080/api/freezers';

@Injectable({
  providedIn: 'root'
})
export class FreezerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Freezer[]> {
    return this.http.get<Freezer[]>(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<Freezer> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Freezer[]> {
    return this.http.get<Freezer[]>(`${baseUrl}?name=${name}`);
  }
}
