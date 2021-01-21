import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

import { Admin } from '../../models/admins';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {

  currentAdmin : string;



  constructor(public router : RouterModule,private authService : AuthService) { 
  }


  


  ngOnInit(): void {
    this.getCurrentAdmin();
  }

  getCurrentAdmin(){
    this.currentAdmin = localStorage.getItem('currentAdmin');
    return this.currentAdmin;
  }


}
