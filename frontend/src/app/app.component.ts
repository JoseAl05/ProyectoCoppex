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
  faVideo = faVideo;

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<Admin>;
  public username: string;
  private i : number;
  public value: Admin;

  constructor(public adminService: AdministradorService,private route: ActivatedRoute,public authService: AuthService,public loginComponent: LoginComponent ){
    this.i = 0;
    let key = localStorage.key(this.i);
    this.value = JSON.parse(localStorage.getItem(key));
    console.log(this.value);
  }

  ngOnInit(): void{

  }

  public get currentUserValue(): string{
    if(this.value == null)
    {
      this.username = null;
      return this.username;
    }
    else{
      this.username = this.value.username;
      console.log(this.username);
      return this.username;
    }
  }


  title = 'frontend';
}
