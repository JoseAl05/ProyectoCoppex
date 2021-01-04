import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Admin } from 'src/app/models/admins';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editUserForm: FormGroup;

  constructor(
    public adminService: AdministradorService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private modalService: NgbModal,
    private fromBuilder: FormBuilder,
    private toastr: ToastrService
  )
  { 
    this.route.params.subscribe(username => {
      console.log(username);
    })
  }


  ngOnInit(): void {
    this.getUsers();
    this.editUserForm = this.fromBuilder.group({
      idAdministrador: [0],
      username: ['']
    })
  }

  success(){
    this.toastr.success('Updated Succsesfully!','You updated your credentials',{
      timeOut: 2000
    })
  }
  error400(){
    this.toastr.error('That username is already taken','Please choose other username',{
      timeOut: 2000
    });
  }


  openModal(targetModal,admin){
    this.modalService.open(targetModal,{
      centered: true,
      backdrop: 'static'
    });
    this.editUserForm.patchValue({
      idAdministrador: admin.idAdministrador,
      username: admin.username
    })
  }

  //** **//
  updateUser(form: NgForm){
    let user: Admin  = {
      idAdministrador: form.controls['idAdministrador'].value,
      username : form.controls['username'].value
    };

    this.adminService.editUser(user).subscribe(
      res => {
        this.getUsers();
        this.success();
        this.modalService.dismissAll();
        console.log("res: ",res);
      },
      err => {
        if(err.status == 400){
          this.error400();
        }
      }
    );
  }


  getUsers(){
    this.adminService.getUsers().subscribe(
      res => {
        this.adminService.user = res
      },
      err => console.log(err)
    )
  }

  
  deleteUser(id:number){
    Swal.fire({
      title:'Are you sure want to remove that user?',
      text:'This going to be eliminated forever',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes, delete it!',
      cancelButtonText:'No, keep it'
    }).then((result) => {
      if(result.value){
        this.toastr.success('User Deleted!','User has been deleted from the system',{
          timeOut:2000
        });
        this.adminService.deleteUser(id).subscribe(
          (res) => {
            this.getUsers();
            console.log(res);
          },
          (err) => console.log(err)
        );
      }
      else if(result.dismiss == Swal.DismissReason.cancel) {
        this.toastr.success('Cancelled','The user has not been deleted',{
          timeOut:2000
        });
      }
    })

  }


}
