import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms'
import { Admin } from 'src/app/models/admins';
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from "moment";


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<Admin>;
  token: any[];

  constructor(
    public adminService: AdministradorService,
    public authService: AuthService,
    private router : Router,
    private toastr: ToastrService
  ) 
  {
    this.currentUserSubject = new BehaviorSubject(localStorage.getItem('adminToken'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  

  ngOnInit(): void {
  }

  resetForm(form: NgForm){
    form.reset();
  }

  success(){
    this.toastr.success('Registered Successfully!','You entered to the system',{
      timeOut: 2000
    })
  }

  error500(){
    this.toastr.error('Error with your credentials','Please check!',{
      timeOut: 2000
    });
  }

  error400(){
    this.toastr.error('That username is already taken','Please choose other username',{
      timeOut: 2000
    });
  }


  addAdmin(form: NgForm){
    form.controls['username'].setErrors({'Incorrect': true});



    this.authService.createAdmin(form.value).subscribe(
      res => {
        this.token = Object.values(res.body);
        console.log(res.body);
        localStorage.setItem('adminToken',this.token[0]);
        localStorage.setItem('currentAdmin',this.token[1]);
        localStorage.setItem('currentIdAdmin',this.token[2]);
        this.currentUserSubject.next(res);
        console.log(localStorage.getItem('adminToken'));
        form.reset();
        this.router.navigate(['/confirmRegister']).then(() => {
          this.success()
        });
      },
      err => {
        if(err.status == 500){
          this.error500();
        }
        if(err.status == 400){
          this.error400();
        }
        console.log(err)
      }
    )
  }



}
