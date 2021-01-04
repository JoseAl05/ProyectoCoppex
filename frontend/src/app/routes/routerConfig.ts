import { Routes } from '@angular/router';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { ConfirmRegisterComponent } from '../components/confirm-register/confirm-register.component';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { CompradorComponent } from '../components/comprador/comprador.component';
import { EmpresaComponent } from '../components/empresa/empresa.component';
import { CotizacionComponent } from '../components/cotizacion/cotizacion.component';


export const appRoutes: Routes =[
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: AdministradorComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile/:username',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'confirmRegister',
        component: ConfirmRegisterComponent
    },
    {
        path: 'addClient',
        component: ClienteComponent
    },
    {
        path: 'addUser',
        component: UsuarioComponent
    },
    {
        path: 'addBuyer',
        component: CompradorComponent
    },
    {
        path: 'addCompany',
        component: EmpresaComponent
    },
    {
        path: 'addCotizacion',
        component: CotizacionComponent
    }
];
