import { Injectable } from '@angular/core';
import { AdministradorService } from './administrador.service';
import { Router } from '@angular/router'
import { Admin } from '../models/admins';
import { HttpClient } from '@angular/common/http'
import { LoginComponent }from '../components/login/login.component';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  URL_CREATE = 'http://localhost:3000/api/admins/signup';
  URL_LOGIN = 'http://localhost:3000/api/admins/signin';
  URL_VERIFY = 'http://localhost:3000/api/admins/isVerify';

  selectedUser : Admin ={
    username: '',
    password: ''
  };
  user : Admin[];

  constructor(private http : HttpClient,private router: Router) { }



  createAdmin(admin: Admin){
    return this.http.post<Admin>(this.URL_CREATE,admin,{observe:'response'});

  }

  signIn(user: Admin){
    console.log(this.http.post(`${this.URL_VERIFY}/${this.getToken()}`,{observe:'response'}));
    if(this.http.post(`${this.URL_VERIFY}/${this.getToken()}`,{observe:'response'}))
    {
      return this.http.post(this.URL_LOGIN,user,{observe:'response'});
    }

  }


  loggedIn(){
    if(localStorage.getItem('adminToken')){
      return true;
    }
    else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('adminToken');
  }

  getCurrentIdAdmin(){
    return localStorage.getItem('currentIdAdmin');
  }


}
