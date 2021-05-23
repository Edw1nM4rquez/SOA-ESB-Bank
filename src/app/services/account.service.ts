import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

 getAccount(){
   return this.http.get(`${ baseUrl }/GetAcoountApi/`).pipe(map((data:any) => data));
 } 
 
 getTransaccion(){
  return this.http.get(`${ baseUrl }/GetTransaccions/`).pipe(map((data:any) => data));
} 

getLibros(){
  return this.http.get(`${ baseUrl }/getLibros/`).pipe(map((data:any) => data));
} 

sendTransferencia(object: any ){
  console.log("Objecto lle", object)
  let params = new HttpParams();
  params= params.append('monto', object.monto);
  params = params.append('banckDes', object.banck);

  return this.http.get(`${ baseUrl }/postListener/`,{params: params});
}

}
