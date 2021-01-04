import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AdministradorService } from './services/administrador.service';
import { Router } from '@angular/router'
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminServce : AdministradorService,private router: Router,private authService: AuthService){

  }



  canActivate(): boolean{
    if(this.authService.loggedIn()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
