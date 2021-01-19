import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drawer } from '../models/drawer.model';

const baseUrl = 'http://localhost:8080/api/drawers';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Drawer[]> {
    return this.http.get<Drawer[]>(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<Drawer> {
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

  findByFreezer(id: any): Observable<Drawer[]> {
    return this.http.get<Drawer[]>(`${baseUrl}?freezerId=${id}`);
  }
}
