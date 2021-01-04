import { Injectable } from '@angular/core';
import { AdministradorService } from './administrador.service';
import { Router } from '@angular/router'
import { Admin } from '../models/admins';
import { HttpClient } from '@angular/common/http'
import { LoginComponent }from '../components/login/login.component';

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
    return this.http.post(this.URL_CREATE,admin);

  }

  signIn(user: Admin){
    console.log(this.http.get(this.URL_VERIFY));
    if(this.http.get(this.URL_VERIFY))
    {
      return this.http.post(this.URL_LOGIN,user);
    }
  }


  loggedIn(){
    for(let i = 0 ; i<= 0 ; i++){
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));
    }
    if(JSON.parse(localStorage.getItem('currentUser'))){
      return true;
    }
    else{
      return false;
    }
  }

  getToken(){
    for(let i = 0 ; i<= 0 ; i++){
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));
      return value;
    }
  }


}
