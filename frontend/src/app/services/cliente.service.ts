import { Injectable } from '@angular/core';
import { Cliente } from '../models/clientes';
import { Country } from '../models/languages';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  URL_CREATE = 'http://localhost:3000/api/clients/addClient';
  URL_GETALLCLIENTS = 'http://localhost:3000/api/clients/getClients';
  URL_DELETECLIENT = 'http://localhost:3000/api/clients/deleteClient';
  URL_UPDATECLIENT = 'http://localhost:3000/api/clients/updateClient';
  URL_GETCLIENTID  = 'http://localhost:3000/api/clients/idClient';

  constructor(private http : HttpClient,private router: Router ) { }

  createClient(client: Cliente){
    return this.http.post(this.URL_CREATE,client,{observe :'response'})
  }

  getClients(){
    return this.http.get<Cliente[]>(this.URL_GETALLCLIENTS);
  }

  getClientId(nombreCliente : string):Observable<HttpResponse<Cliente>> {
    return this.http.get<Cliente>(`${this.URL_GETCLIENTID}/${nombreCliente}`,{observe:'response',responseType:'json'});
  }

  getCountries(){
    return this.http.get<Country[]>('../assets/countries/countries.json');
  }
  deleteUser(idCliente : number){
    return this.http.delete(`${this.URL_DELETECLIENT}/${idCliente}`);
  }

  updateClient(client: Cliente){
    return this.http.put(`${this.URL_UPDATECLIENT}/${client.idCliente}`,client)
  }
}
