import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministradorService }from './services/administrador.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from './models/admins';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
declare var $:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentAdmin: string;



  constructor(public adminService: AdministradorService,private route: ActivatedRoute,public authService: AuthService,public loginComponent: LoginComponent ){

  }

  ngOnInit(): void{
    this.getCurrentAdmin();
  }

  getCurrentAdmin(){
    this.currentAdmin = localStorage.getItem('currentAdmin');
    return this.currentAdmin;
  }

  title = 'frontend';
}
