import { Component, OnInit,ViewChild } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { Cliente } from 'src/app/models/clientes';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/languages';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  //**PROPERTIES**//
  countriesList:any;
  objectCountrySelected: any;
  objectMapped: any;

  createdClient : Cliente ={
    nombreCliente: '',
    pais: ''
  };
  createdCountry: Country = {
    name:'',
    code:''
  }
  country: Country[];
  clients : Cliente[];

  editClientForm: FormGroup;



  constructor(
    private clientService : ClienteService,
    private router : Router,
    private fromBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService

  ) {

   }

  ngOnInit(): void {

    this.getClients();
    this.getCountries();
    this.editClientForm = this.fromBuilder.group({
      idCliente: [0],
      nombreCliente: [''],
      pais: ['']
    })
  }

  //**ALERTS**//

  
  successAdd(){
    this.toastr.success('Cliente creado correctamente!','El cliente fue registrado en el sistema',{
      timeOut: 2000
    })
  }

  errorAdd(){
    this.toastr.error('Error al crear el cliente!','Por favor intente denuevo',{
      timeOut: 2000
    });
  }

  successDelete(){
    this.toastr.success('Cliente eliminado correctamente!','El cliente fue eliminado del sistema',{
      timeOut: 2000
    })
  }

  errorDelete(){
    this.toastr.error('Error al eliminar el cliente!','Por favor intente denuevo',{
      timeOut: 2000
    });
  }

  successUpdate(){
    this.toastr.success('Cliente modificado correctamente!','Las credenciales del cliente fueron modificadas correctamente',{
      timeOut: 2000
    })
  }

  errorUpdate(){
    this.toastr.error('Error al modificar las credenciales del cliente!','Por favor intente denuevo',{
      timeOut: 2000
    });
  }


  //** MODAL FUNCTION **//
  openModal(targetModal,client){
    this.modalService.open(targetModal,{
      centered: true,
      backdrop: 'static'
    });
    this.editClientForm.patchValue({
      idCliente: client.idCliente,
      nombreCliente : client.nombreCliente,
      pais : client.pais
    })
  }


  // **FUNCTIONS FOR CLIENT **//


  addClient(form: NgForm){
    this.objectCountrySelected = form.control.value['pais'];
    this.objectMapped = Object.values(this.objectCountrySelected);

    console.log(this.objectCountrySelected);

    const clientData = {
      nombreCliente:form.control.value['nombreCliente'],
      pais:this.objectMapped[1]
    }
    this.clientService.createClient(clientData).subscribe(
      res => {
        this.successAdd();
        this.getClients();
        form.resetForm();
        this.router.navigate(['/addClient']);
        console.log(res);
        console.log(form);
      },
      err => {
        this.errorAdd();
        console.log(err);
      }
    )
  }

  deleteClient(idCliente:number){
    this.clientService.deleteUser(idCliente).subscribe(
      res => {
        this.successDelete();
        console.log(res);
        this.getClients();
      },
      err => {
        this.errorDelete();
        console.error(err);
      }
    )
  }

  updateClient(form: NgForm){
    let client: Cliente  = {
      idCliente: form.controls['idCliente'].value,
      nombreCliente : form.controls['nombreCliente'].value
    };

    this.clientService.updateClient(client).subscribe(
      res => {
        this.getClients();
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

  getClients(){
    this.clientService.getClients().subscribe(
      res => {
        if(res !== undefined){
          this.clients = res;
        }
      },
      err => console.log(err)
    )
  }

  getCountries(){
    this.countriesList = this.clientService.getCountries().pipe(
      map(countries => {
        return Object.values(countries);
      })
    )

    console.log(this.countriesList);
  }
}
