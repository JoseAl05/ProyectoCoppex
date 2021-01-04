import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Empresa } from 'src/app/models/empresas';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/clientes';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

    //** PROPERTIES **//

  
    createdCompany : Empresa ={
      nombreEmpresa: ''
    };
    business : Empresa[]
  
    editCompanyForm: FormGroup;
    companyForm : FormGroup;

  constructor(
    private companyService : EmpresaService,
    private router : Router,
    private fromBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getBusiness();
    this.editCompanyForm = this.fromBuilder.group({
      idEmpresa: [0],
      nombreEmpresa: ['']
    })
  }


      //** MODAL FUNCTION **//
      openModal(targetModal,company){
        this.modalService.open(targetModal,{
          centered: true,
          backdrop: 'static'
        });
        this.editCompanyForm.patchValue({
          idEmpresa: company.idEmpresa,
          nombreEmpresa : company.nombreEmpresa
        })
      }

      //**ALERTS**//

    successAdd(){
      this.toastr.success('Empresa creada correctamente!','La empresa fue registrada en el sistema',{
        timeOut: 5000
      })
    }
  
    errorAdd(){
      this.toastr.error('Error al crear la empresa!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }
  
    successDelete(){
      this.toastr.success('Empresa eliminada correctamente!','La empresa fue eliminada del sistema',{
        timeOut: 5000
      })
    }
  
    errorDelete(){
      this.toastr.error('Error al eliminar la empresa!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }
  
    successUpdate(){
      this.toastr.success('Empresa modificada correctamente!','Las credenciales de la empresa fueron modificadas correctamente',{
        timeOut: 5000
      })
    }
  
    errorUpdate(){
      this.toastr.error('Error al modificar las credenciales de la empresa!','Por favor intente denuevo',{
        timeOut: 5000
      });
    }

    //** FUNCTION FOR BUSINESS **//

  addCompany(form: NgForm){


    this.companyService.createCompany(form.value).subscribe(
      res => {
        this.successAdd();
        this.getBusiness();
        form.resetForm();
        console.log(res);
      },
      err => {
        this.errorAdd();
        console.error(err);
      }
    )
  }

  getBusiness(){
    this.companyService.getBusiness().subscribe(
      res => {
        this.business = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

  updateCompany(form: NgForm){
    let company: Empresa  = {
      idEmpresa: form.controls['idEmpresa'].value,
      nombreEmpresa : form.controls['nombreEmpresa'].value
    };

    this.companyService.updateCompany(company).subscribe(
      res => {
        this.getBusiness();
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

  deleteCompany(idEmpresa:number){
    this.companyService.deleteCompany(idEmpresa).subscribe(
      res => {
        this.successDelete();
        console.log(res);
        this.getBusiness();
      },
      err => {
        this.errorDelete();
        console.error(err);
      }
    )
  }

}
