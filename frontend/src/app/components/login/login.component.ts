import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService }from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from '../../models/admins';
import { ToastrService } from 'ngx-toastr'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({ providedIn: 'root' })
export class LoginComponent implements OnInit {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<Admin>;


  constructor(
    public adminService: AdministradorService,
    public authService: AuthService,
    private router: Router,
    private toastr : ToastrService
  ) 
  {
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  ngOnInit(): void {
  }


  public get currentUserValue(): Admin{
    return this.currentUserSubject.value;
  }

  //**ALERTS**//

  success(){
    this.toastr.success('Logged!','You entered to the system',{
      timeOut: 2000
    })
  }

  error401(){
    this.toastr.error('Error!','Wrong Password',{
      timeOut: 2000
    })
  }

  error404(){
    this.toastr.error('Error!','The user does not exists!',{
      timeOut: 2000
    })
  }


  //**LOGIN FUNCTIONS**//

  login(form: NgForm){
    const userLogin = this.authService.signIn(form.value)
    userLogin.subscribe(
      res => {
        localStorage.setItem('currentUser',JSON.stringify(res));
        this.currentUserSubject.next(res);
        this.success();
        this.router.navigate(['/profile',form.controls['username'].value])
      },
      err => {
        if(err.status == 401)
        {
          this.error401();
        }
        if(err.status == 404)
        {
          this.error404();
        }
        console.log(err);
      }
    )
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }




}
