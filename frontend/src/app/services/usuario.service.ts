import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_CREATEUSER = 'http://localhost:3000/api/users/addUser';
  URL_GETALLUSERS = 'http://localhost:3000/api/users/getUsers';
  URL_DELETEUSER = 'http://localhost:3000/api/users/deleteUser';
  URL_UPDATEUSER = 'http://localhost:3000/api/users/updateUser';
  URL_GETAUSER = 'http://localhost:3000/api/users/getAUser'

  constructor(private http : HttpClient,private router: Router) { }

  createUser(user: Usuario){
    return this.http.post(this.URL_CREATEUSER,user,{observe:'response'});
  }

  getUsers(){
    return this.http.get<Usuario[]>(this.URL_GETALLUSERS);
  }

  getAUser(idUsuario : number){
    return this.http.get<Usuario>(`${this.URL_GETAUSER}/${idUsuario}`,{observe:'response'});
  }

  updateUser(user : Usuario){
    return this.http.put(`${this.URL_UPDATEUSER}/${user.idUsuario}`,user)
  }

  deleteUser(idUsuario: number){
    return this.http.delete(`${this.URL_DELETEUSER}/${idUsuario}`)
  }


}
