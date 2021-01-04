import { Injectable } from '@angular/core';
import { Comprador } from '../models/compradores';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {

  URL_CREATEBUYER = 'http://localhost:3000/api/buyers/addBuyer';
  URL_GETALLBUYERS = 'http://localhost:3000/api/buyers/getBuyers';
  URL_DELETEBUYER = 'http://localhost:3000/api/buyers/deleteBuyer';
  URL_UPDATEBUYER = 'http://localhost:3000/api/buyers/updateBuyer';

  constructor(private http : HttpClient,private router: Router) { }



  createBuyer(buyer: Comprador){
    return this.http.post(this.URL_CREATEBUYER,buyer,{observe:'response'});
  }

  getBuyers(){
    return this.http.get<Comprador[]>(this.URL_GETALLBUYERS);
  }

  updateBuyer(buyer : Comprador){
    return this.http.put(`${this.URL_UPDATEBUYER}/${buyer.idComprador}`,buyer)
  }

  deleteBuyer(idComprador: number){
    return this.http.delete(`${this.URL_DELETEBUYER}/${idComprador}`)
  }
}
