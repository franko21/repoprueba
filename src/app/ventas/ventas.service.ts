import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ventas } from './ventas';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private urlEndPoint:string ='http://localhost:8080/api/venta';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http:HttpClient) { }

  getVentas(): Observable<Ventas[]> {

  return this.http.get(this.urlEndPoint).pipe(
    map(Response => Response as Ventas[])

  );
}


  createVent(venta: Ventas): Observable<Ventas>{
    return this.http.post<Ventas>(this.urlEndPoint, venta, {headers: this.httpHeaders})
  }

  getVent(cedula: any):Observable<Ventas>{
    return this.http.get<Ventas>(`${this.urlEndPoint}/${cedula}`);
  }

  deleteVent(cedula: any):Observable<any>{
    return this.http.delete<Ventas>(`${this.urlEndPoint}/${cedula}`)
  }
  
  editVent(cedula:any,compra:Ventas):Observable<any>{
    return this.http.put<Ventas>(`${this.urlEndPoint}/${cedula}`,compra)
  }
}
