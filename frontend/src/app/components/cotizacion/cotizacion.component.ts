import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../services/cotizacion.service';
import { ClienteService } from '../../services/cliente.service';
import { EmpresaService } from '../../services/empresa.service';
import { AuthService }from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { CompradorService } from '../../services/comprador.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cotizacion } from 'src/app/models/cotizaciones';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/clientes';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  createdCotizacion : Cotizacion ={
    idAdministrador : 0,
    idCliente: 0,
    idComprador: 0,
    idEmpresa : 0,
    idUsuario : 0,
    nombreEquipo: '',
    numeroDeParte: '',
    numeroLicitacion: '',
    fechaRecepcion: new Date(),
    numeroCotizacionRepresentada: '',
    divisa : '',
    montoComisionCoppex : 0,
    condicionEntrega: '',
    plazo : '',
    numeroOrden: '',
    fechaEmision: new Date(),
    fechaEntrega : new Date(),
    estadoCotizacion: '',
    seguimiento: ''
  };
  cotizaciones : Cotizacion[];
  clientes : Cliente[];
  countryCodesList:any;
  clientList : any;
  companyList : any;
  buyerList: any;
  userList: any;
  actualAdministrador: any;
  objectCountryCodeSelected: any;
  objectMapped: any;
  objectToken: any;
  mapToken: any;

  constructor(
    private cotizacionService : CotizacionService,
    private clientService : ClienteService,
    private companyService : EmpresaService,
    private authService : AuthService,
    private userService: UsuarioService,
    private buyerService: CompradorService,
    private router : Router,
    private fromBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.getBusiness();
    this.getCountryCodes();
    this.getBuyers();
    this.getUsers();
    this.getCotizaciones();
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
        


  //** FUNCTIONS OF COTIZACION **//

  addCotizacion(form: NgForm){
    
    this.objectCountryCodeSelected = form.control.value['divisa'];
    this.objectMapped = Object.values(this.objectCountryCodeSelected)

    this.objectToken = this.authService.getToken();
    this.mapToken = Object.values(this.objectToken);



    const cotizacionData = {
      idAdministrador: this.mapToken[2],
      idCliente: form.control.value['cliente'],
      idEmpresa: form.control.value['empresa'],
      nombreEquipo: form.control.value['nombreEquipo'],
      numeroLicitacion : form.control.value['numeroLicitacion'],
      numeroDeParte: form.control.value['numeroDeParte'],
      fechaRecepcion: form.control.value['fechaRecepcion'],
      numeroCotizacionRepresentada: form.control.value['numeroCotizacionRepresentada'],
      divisa: this.objectMapped[1],
      montoComisionCoppex: form.control.value['montoComisionCoppex'],
      condicionEntrega: form.control.value['condicionEntrega'],
      plazo : form.control.value['plazo'],
      numeroOrden : form.control.value['numeroOrden'],
      fechaEmision : form.control.value['fechaEmision'],
      fechaEntrega :  form.control.value['fechaEntrega'],
      idComprador : form.control.value['comprador'],
      idUsuario : form.control.value['usuario']

    }

    this.cotizacionService.createCotiacion(cotizacionData).subscribe(
      res => {
        this.successAdd();
        this.getCotizaciones();
        form.resetForm();
      },
      err => {
        this.errorAdd();
        console.error(err);
      }
    )
  }

  getCotizaciones(){
    this.cotizacionService.getCotizaciones().subscribe(
      res => {
        this.cotizaciones = res
      },
      err => {
        console.log(err);
      }
    )
  }

  updateCotizacion(form : NgForm){
    this.cotizacionService.updateCotizacion(form.value).subscribe(
      res => {
        this.getCotizaciones();
        this.modalService.dismissAll();
        this.successUpdate();
        console.log(res);
      },
      err => {
        this.errorDelete();
        console.log(err);
      }
    )
  }

  deleteCotizacion(idCotizacion : number){
    this.cotizacionService.deleteCotizacion(idCotizacion).subscribe(
      res => {
        this.getCotizaciones();
        this.successDelete();
        console.log(res);
      },
      err => {
        this.errorDelete();
        console.log(err);
      }
    )
  }

  getClients(){
    this.clientList = this.clientService.getClients().pipe(
      map(clients => {
        return Object.values(clients);
      })
    )
  }

  getBusiness(){
    this.companyList = this.companyService.getBusiness().pipe(
      map(business => {
        return Object.values(business);
      })
    )
  }

  getCountryCodes(){
    this.countryCodesList = this.cotizacionService.getCountryCodes().pipe(
      map(countryCodes => {
        return Object.values(countryCodes);
      })
    )
  }

  getUsers(){
    this.userList = this.userService.getUsers().pipe(
      map(users => {
        return Object.values(users);
      })
    )
  }

  getBuyers(){
    this.buyerList = this.buyerService.getBuyers().pipe(
      map(buyers => {
        return Object.values(buyers);
      })
    )
  }



}
