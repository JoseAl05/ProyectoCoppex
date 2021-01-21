import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresas';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  URL_CREATECOMPANY = 'http://localhost:3000/api/business/addCompany';
  URL_GETALLBUSINESS = 'http://localhost:3000/api/business/getBusiness';
  URL_DELETECOMPANY = 'http://localhost:3000/api/business/deleteCompany';
  URL_UPDATECOMPANY = 'http://localhost:3000/api/business/updateCompany';
  URL_GETACOMPANY = 'http://localhost:3000/api/business/getACompany';

  constructor(private http : HttpClient,private router: Router) { }

  createCompany(company: Empresa){
    return this.http.post(this.URL_CREATECOMPANY,company,{observe :'response'})
  }

  getBusiness(){
    return this.http.get<Empresa[]>(this.URL_GETALLBUSINESS);
  }

  getACompany(idEmpresa:number){
    return this.http.get<Empresa>(`${this.URL_GETACOMPANY}/${idEmpresa}`,{observe:'response'});
  }

  deleteCompany(idEmpresa : number){
    return this.http.delete(`${this.URL_DELETECOMPANY}/${idEmpresa}`);
  }

  updateCompany(company: Empresa){
    return this.http.put(`${this.URL_UPDATECOMPANY}/${company.idEmpresa}`,company)
  }
}
