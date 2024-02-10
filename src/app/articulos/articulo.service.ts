import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Articulos } from './articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private urlEndPoint:string ='http://localhost:8080/api/articulo';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http:HttpClient) { }

  getArticulos(): Observable<Articulos[]> {

  return this.http.get(this.urlEndPoint).pipe(
    map(Response => Response as Articulos[])

  );
}


  createArt(articulo: Articulos): Observable<Articulos>{
    return this.http.post<Articulos>(this.urlEndPoint, articulo, {headers: this.httpHeaders})
  }

  getArt(cedula: any):Observable<Articulos>{
    return this.http.get<Articulos>(`${this.urlEndPoint}/${cedula}`);
  }

  deleteArt(cedula: any):Observable<any>{
    return this.http.delete<Articulos>(`${this.urlEndPoint}/${cedula}`)
  }
  
  editArt(cedula:any,articulo:Articulos):Observable<any>{
    return this.http.put<Articulos>(`${this.urlEndPoint}/${cedula}`,articulo)
  }
}
