import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admins';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  URL_GET = 'http://localhost:3000/api/admins/getUsers';
  URL_CREATE = 'http://localhost:3000/api/admins/signup';
  URL_DELETE  = 'http://localhost:3000/api/admins/deleteUser';
  URL_UPDATE = 'http://localhost:3000/api/admins/updateUser';
  URL_LOGIN = 'http://localhost:3000/api/admins/signin';
  URL_GETAUSER = 'http://localhost:3000/api/users/getAUser';
  URL_GETACOTIZANTE = 'http://localhost:3000/api/admins/getACotizante';
  
  createdUser : Admin ={
    username: '',
    password: ''
  };
  selectedUser : Admin ={
    username: '',
    password: ''
  };
  user : Admin[];

  constructor(private http : HttpClient,private router: Router ) { }

  getUsers(){
    return this.http.get<Admin[]>(this.URL_GET);
  }
  
  getAUser(id:number){
    return this.http.post<Admin>(this.URL_GETAUSER,id,{observe:'response'});
  }

  createAdmin(admin: Admin){
    return this.http.post(this.URL_CREATE,admin,{observe: 'response'});

  }

  editUser(admin : Admin){
    return this.http.put(`${this.URL_UPDATE}/${admin.idAdministrador}`,admin);
  }

  deleteUser(id : number){
    return this.http.delete(`${this.URL_DELETE}/${id}`);
  }
  getACotizante(idAdministrador:number){
    return this.http.post<String>(this.URL_GETACOTIZANTE,idAdministrador,{observe:'response'});
  }




}
