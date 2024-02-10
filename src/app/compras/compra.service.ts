import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Compra } from './compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private urlEndPoint:string ='http://localhost:8080/api/compra';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http:HttpClient) { }

  getCompras(): Observable<Compra[]> {

  return this.http.get(this.urlEndPoint).pipe(
    map(Response => Response as Compra[])

  );
}


  createComp(compra: Compra): Observable<Compra>{
    return this.http.post<Compra>(this.urlEndPoint, compra, {headers: this.httpHeaders})
  }

  getComp(cedula: any):Observable<Compra>{
    return this.http.get<Compra>(`${this.urlEndPoint}/${cedula}`);
  }

  deleteComp(cedula: any):Observable<any>{
    return this.http.delete<Compra>(`${this.urlEndPoint}/${cedula}`)
  }
  
  editComp(cedula:any,compra:Compra):Observable<any>{
    return this.http.put<Compra>(`${this.urlEndPoint}/${cedula}`,compra)
  }
}
