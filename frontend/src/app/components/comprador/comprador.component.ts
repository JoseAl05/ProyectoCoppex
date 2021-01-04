import { Component, OnInit } from '@angular/core';
import { CompradorService } from '../../services/comprador.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Comprador } from 'src/app/models/compradores';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comprador',
  templateUrl: './comprador.component.html',
  styleUrls: ['./comprador.component.css']
})
export class CompradorComponent implements OnInit {

  //** PROPERTIES **//

  objectPhoneSelected: any;
  objectMapped: any;

  createdComprador : Comprador ={
    nombreComprador: '',
    emailComprador: '',
    telefonoComprador: ''
  };
  buyers : Comprador[];

  editBuyerForm: FormGroup;
  compradorForm : FormGroup;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  constructor(
    private buyerService : CompradorService,
    private router : Router,
    private fromBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getBuyers();

    this.compradorForm = new FormGroup({
      telefonoComprador: new FormControl(undefined, [Validators.required])
    })
    this.editBuyerForm = this.fromBuilder.group({
      idComprador: [0],
      nombreComprador: [''],
      emailComprador: [''],
      telefonoComprador: ['']
    })
  }

  //** MODAL FUNCTION **//
    openModal(targetModal,buyer){
      this.modalService.open(targetModal,{
        centered: true,
        backdrop: 'static'
      });
      this.editBuyerForm.patchValue({
        idComprador: buyer.idComprador,
        nombreComprador : buyer.nombreComprador,
        emailComprador : buyer.emailComprador,
        telefonoComprador: buyer.telefonoComprador
      })
    }

    //**ALERTS**//

    successAdd(){
      this.toastr.success('Comprador creado correctamente!','El comprador fue registrado en el sistema',{
        timeOut: 5000
      })
    }

    errorAdd(){
      this.toastr.error('Error al crear el comprador!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }

    successDelete(){
      this.toastr.success('Comprador eliminado correctamente!','El comprador fue eliminado del sistema',{
        timeOut: 5000
      })
    }

    errorDelete(){
      this.toastr.error('Error al eliminar el comprador!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }

    successUpdate(){
      this.toastr.success('Comprador modificado correctamente!','Las credenciales del comprador fueron modificadas correctamente',{
        timeOut: 5000
      })
    }

    errorUpdate(){
      this.toastr.error('Error al modificar las credenciales del comprador!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }


  //** FUNCTION FOR USERS **//

  addBuyer(form: NgForm){
    this.objectPhoneSelected = form.controls['telefonoComprador'].value;
    this.objectMapped = Object.values(this.objectPhoneSelected);

    console.log(this.objectPhoneSelected);
    const buyerData = {
      nombreComprador : form.control.value['nombreComprador'],
      emailComprador : form.control.value['emailComprador'],
      telefonoComprador : this.objectMapped[1]
    }

    this.buyerService.createBuyer(buyerData).subscribe(
      res => {
        this.successAdd();
        this.getBuyers();
        form.resetForm();
        console.log(res);
      },
      err => {
        this.errorAdd();
        console.error(err);
      }
    )
  }

  getBuyers(){
    this.buyerService.getBuyers().subscribe(
      res => {
        this.buyers = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

  updateBuyer(form: NgForm){
    let buyer: Comprador  = {
      idComprador: form.controls['idComprador'].value,
      nombreComprador : form.controls['nombreComprador'].value,
      emailComprador : form.controls['emailComprador'].value,
      telefonoComprador: form.controls['telefonoComprador'].value
    };

    this.buyerService.updateBuyer(buyer).subscribe(
      res => {
        this.getBuyers();
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

  deleteBuyer(idComprador:number){
    this.buyerService.deleteBuyer(idComprador).subscribe(
      res => {
        this.successDelete();
        console.log(res);
        this.getBuyers();
      },
      err => {
        this.errorDelete();
        console.error(err);
      }
    )
  }

}



