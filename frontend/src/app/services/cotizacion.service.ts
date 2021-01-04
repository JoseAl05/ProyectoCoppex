import { Injectable } from '@angular/core';
import { Cotizacion } from '../models/cotizaciones';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CountryCodes } from '../models/countryCodes';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  URL_CREATECOTIZACION = 'http://localhost:3000/api/cotizaciones/addCotizacion';
  URL_GETALLCOTIZACIONES = 'http://localhost:3000/api/cotizaciones/getCotizaciones';
  URL_DELETECOTIZACION = 'http://localhost:3000/api/cotizaciones/deleteCotizacion';
  URL_UPDATECOTIZACION = 'http://localhost:3000/api/cotizaciones/updateCotizacion';

  constructor(private http : HttpClient,private router: Router) { }


  createCotiacion(cotizacion: Cotizacion){
    return this.http.post(this.URL_CREATECOTIZACION,cotizacion,{observe:'response'});
  }

  getCotizaciones(){
    return this.http.get<Cotizacion[]>(this.URL_GETALLCOTIZACIONES);
  }

  getCountryCodes(){
    return this.http.get<CountryCodes[]>('../assets/countryCodes/countryCodes.json');
  }

  updateCotizacion(cotizacion: Cotizacion){
    return this.http.put(`${this.URL_UPDATECOTIZACION}/${cotizacion.idCotizacion}`,cotizacion);
  }

  deleteCotizacion(idCotizacion:number){
    return this.http.delete(`${this.URL_DELETECOTIZACION}/${idCotizacion}`);
  }
}
