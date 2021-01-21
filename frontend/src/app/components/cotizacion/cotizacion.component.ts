import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
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
    idAdministrador : '',
    idCliente: 0,
    idComprador: 0,
    idEmpresa : 0,
    idUsuario : 0,
    nombreEquipo: '',
    numeroDeParte: '',
    numeroDeLicitacion: '',
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
  informeCotizacion : Cotizacion[];
  clientes : Cliente[];
  clientName : string;
  companyName: string;
  buyerName: string;
  buyerEmail:string;
  buyerPhone:string;
  userName:string;
  userEmail:string;
  userPhone:string;
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
  currentAdmin: string;

  constructor(
    private cotizacionService : CotizacionService,
    private clientService : ClienteService,
    private companyService : EmpresaService,
    private authService : AuthService,
    private userService: UsuarioService,
    private buyerService: CompradorService,
    private adminService:  AdministradorService,
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

  openModal(targetModal,cotizacion){
    this.modalService.open(targetModal,{
      centered: true,
      backdrop: 'static',
      size:'xl',
      windowClass: 'informeModal'
    });
    this.getAClient(cotizacion.idCliente);
    this.getACompany(cotizacion.idEmpresa);
    this.getABuyer(cotizacion.idComprador);
    this.getAUser(cotizacion.idUsuario);
    this.informeCotizacion = cotizacion;
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
    console.log(this.objectMapped);

    this.currentAdmin = this.authService.getCurrentIdAdmin();



    const cotizacionData = {
      idAdministrador: this.currentAdmin,
      idCliente: form.control.value['cliente'],
      idEmpresa: form.control.value['empresa'],
      nombreEquipo: form.control.value['nombreEquipo'],
      numeroDeLicitacion : form.control.value['numeroDeLicitacion'],
      numeroDeParte: form.control.value['numeroDeParte'],
      fechaRecepcion: form.control.value['fechaRecepcion'],
      numeroCotizacionRepresentada: form.control.value['numeroCotizacionRepresentada'],
      divisa: this.objectMapped[0],
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


  getAClient(idCliente : number){
    this.clientService.getAClient(idCliente).subscribe(
      res => {
        this.clientName = res.body[0].nombreCliente;
        console.log(res.body[0].nombreCliente);
      },
      err => {
        console.error(err);
      }
    )
  }

  getBusiness(){
    this.companyList = this.companyService.getBusiness().pipe(
      map(business => {
        return Object.values(business);
      })
    )
  }

  getACompany(idEmpresa:number){
    this.companyService.getACompany(idEmpresa).subscribe(
      res => {
        this.companyName = res.body[0].nombreEmpresa;
      },
      err => {
        console.error(err);
      }
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

  getAUser(idUsuario : number){
    this.userService.getAUser(idUsuario).subscribe(
      res => {
        this.userName = res.body[0].nombreUsuario;
        this.userEmail = res.body[0].emailUsuario;
        this.userPhone = res.body[0].telefonoUsuario;
      },
      err => {
        console.error(err);
      }
    )
  }

  getBuyers(){
    this.buyerList = this.buyerService.getBuyers().pipe(
      map(buyers => {
        return Object.values(buyers);
      })
    )
  }

  getABuyer(idComprador:number){
    this.buyerService.getABuyer(idComprador).subscribe(
      res => {
        console.log(res.body);
        this.buyerName = res.body[0].nombreComprador;
        this.buyerEmail = res.body[0].emailComprador;
        this.buyerPhone = res.body[0].telefonoComprador;
      },
      err => {
        console.error(err);
      }
    )
  }

  getCotizante(idAdministrador : number){
    this.adminService.getACotizante(idAdministrador).subscribe(
      res => {
        console.log(res.body);
      },
      err => {
        console.log(err);
      }
    )

  }



}
