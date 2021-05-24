import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public Url : string ="";
  constructor(
    private http: HttpClient
  ) { }

  getAccount() {
    return this.http.get(`${baseUrl}/GetAcoountApi/`).pipe(map((data: any) => data));
  }

  getTransaccion() {
    return this.http.get(`${baseUrl}/GetTransaccions/`).pipe(map((data: any) => data));
  }

  getLibros() {
    return this.http.get(`${baseUrl}/getLibros/`).pipe(map((data: any) => data));
  }

  sendTransferencia(object: any) {
    console.log("Objecto lle", object)
    let params = new HttpParams();
    

    console.log("Tipodea", object.tipo)

    if (object.tipo == 'Transferencia') {
      params = params.append('monto', object.monto);
      params = params.append('bandest', object.bandest);
      params = params.append('banorigen', object.banorigen);
      params = params.append('tipo', object.tipo);
      this.Url = 'postListener';
      
    } else if (object.tipo == 'Retiro') {
      params = params.append('monto', object.monto);
      params = params.append('banorigen', object.banorigen);
      params = params.append('tipo', object.tipo);
      this.Url = 'postRetiro';

    } else if (object.tipo == 'Deposito') {
      params = params.append('monto', object.monto);
      params = params.append('banorigen', object.banorigen);
      params = params.append('tipo', object.tipo);
      this.Url = 'postDeposito';

    }

    return this.http.get(`${baseUrl}/${this.Url}/`, { params: params });
  }
  
}
