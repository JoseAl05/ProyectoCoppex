import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})


export class UsuarioComponent implements OnInit {

  //** PROPERTIES **//

  objectPhoneSelected: any;
  objectMapped: any;

  createdUser : Usuario ={
    nombreUsuario: '',
    emailUsuario: '',
    telefonoUsuario: ''
  };
  users : Usuario[];

  editUserForm: FormGroup;
  usuarioForm : FormGroup;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;



  constructor(
    private userService : UsuarioService,
    private router : Router,
    private fromBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.getUsers();

    this.usuarioForm = new FormGroup({
      telefonoUsuario: new FormControl(undefined, [Validators.required])
    })
    this.editUserForm = this.fromBuilder.group({
      idUsuario: [0],
      nombreUsuario: ['',Validators.required],
      emailUsuario: ['',Validators.email],
      telefonoUsuario: ['',Validators.required]
    })
  }

  get userData() { return this.usuarioForm.controls; }




    //** MODAL FUNCTION **//
    openModal(targetModal,user){
      this.modalService.open(targetModal,{
        centered: true,
        backdrop: 'static'
      });
      this.editUserForm.patchValue({
        idUsuario: user.idUsuario,
        nombreUsuario : user.nombreUsuario,
        emailUsuario : user.emailUsuario,
        telefonoUsuario: user.telefonoUsuario
      })
    }

    //**ALERTS**//

    successAdd(){
      this.toastr.success('Usuario creado correctamente!','El usuario fue registrado en el sistema',{
        timeOut: 5000
      })
    }
  
    errorAdd(){
      this.toastr.error('Error al crear el usuario!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }
  
    successDelete(){
      this.toastr.success('Usuario eliminado correctamente!','El usuario fue eliminado del sistema',{
        timeOut: 5000
      })
    }
  
    errorDelete(){
      this.toastr.error('Error al eliminar el usuario!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }
  
    successUpdate(){
      this.toastr.success('Usuario modificado correctamente!','Las credenciales del usuario fueron modificadas correctamente',{
        timeOut: 5000
      })
    }
  
    errorUpdate(){
      this.toastr.error('Error al modificar las credenciales del usuario!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }


  //** FUNCTION FOR USERS **//

  addUser(form: NgForm){
    this.objectPhoneSelected = form.controls['telefonoUsuario'].value;
    this.objectMapped = Object.values(this.objectPhoneSelected);

    console.log(this.objectPhoneSelected);
    const userData = {
      nombreUsuario : form.control.value['nombreUsuario'],
      emailUsuario : form.control.value['emailUsuario'],
      telefonoUsuario : this.objectMapped[1]
    }

    this.userService.createUser(userData).subscribe(
      res => {
        this.successAdd();
        this.getUsers();
        form.resetForm();
        console.log(res);
      },
      err => {
        this.errorAdd();
        console.error(err);
      }
    )
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

  updateUser(form: NgForm){
    let user: Usuario  = {
      idUsuario: form.controls['idUsuario'].value,
      nombreUsuario : form.controls['nombreUsuario'].value,
      emailUsuario : form.controls['emailUsuario'].value,
      telefonoUsuario: form.controls['telefonoUsuario'].value
    };

    this.userService.updateUser(user).subscribe(
      res => {
        this.getUsers();
        this.modalService.dismissAll();
        this.successUpdate();
        console.log("res: ",res);
      },
      err => {
        this.errorUpdate();
        console.log(err);
      }
    );
  }

  deleteUser(idUsuario:number){
    this.userService.deleteUser(idUsuario).subscribe(
      res => {
        this.successDelete();
        console.log(res);
        this.getUsers();
      },
      err => {
        this.errorDelete();
        console.error(err);
      }
    )
  }

}
