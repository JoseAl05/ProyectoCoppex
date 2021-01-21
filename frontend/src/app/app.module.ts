import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Angulartics2Module } from 'angulartics2';
import {MatPaginatorModule,} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DataTablesModule} from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CustomFormsModule } from 'ngx-custom-validators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';

registerLocaleData(localeCl, 'cl');




import { AppComponent } from './app.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LoginComponent } from './components/login/login.component';
import { appRoutes } from './routes/routerConfig';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ConfirmRegisterComponent } from './components/confirm-register/confirm-register.component';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClienteComponent } from './components/cliente/cliente.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CompradorComponent } from './components/comprador/comprador.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministradorComponent,
    LoginComponent,
    ProfileComponent,
    ConfirmRegisterComponent,
    ClienteComponent,
    UsuarioComponent,
    CompradorComponent,
    EmpresaComponent,
    CotizacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RxReactiveFormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    MatSelectCountryModule.forRoot('es'),
    Angulartics2Module.forRoot(),
    MatSelectCountryModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    DataTablesModule,
    NgSelectModule,
    NgxIntlTelInputModule,
    CustomFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: localeCl, useValue: 'cl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
