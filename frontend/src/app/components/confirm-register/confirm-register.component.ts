import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

import { Admin } from '../../models/admins';


@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<Admin>;
  public username: string;
  private i : number;
  public value: Admin;


  constructor(public router : RouterModule) { 
    this.i = 0;
    let key = localStorage.key(this.i);
    this.value = JSON.parse(localStorage.getItem(key));
    console.log(this.value);
  }

  public get currentUserValue(): string{
    this.username = this.value.username;
    console.log(this.username);
    return this.username;
  }


  ngOnInit(): void {
  }




}
