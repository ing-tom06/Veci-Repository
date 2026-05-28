import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VolunteerLayoutComponent } from './layouts/volunteer-layout/volunteer-layout.component';
import { ElderLayoutComponent } from './layouts/elder-layout/elder-layout.component';
import { voluntarioGuard } from './guards/voluntario.guard';
import { adultoMayorGuard } from './guards/adulto-mayor.guard';

// Voluntario Components
import { SolicitudesComponent } from './components/voluntario/solicitudes/solicitudes.component';
import { MisOfertasComponent } from './components/voluntario/mis-ofertas/mis-ofertas.component';
import { HistorialComponent as VoluntarioHistorial } from './components/voluntario/historial/historial.component';

// Adulto Mayor Components
import { NuevaSolicitudComponent } from './components/adulto-mayor/nueva-solicitud/nueva-solicitud.component';
import { MisSolicitudesComponent } from './components/adulto-mayor/mis-solicitudes/mis-solicitudes.component';
import { HistorialAmComponent } from './components/adulto-mayor/historial-am/historial-am.component';
import { EditarPerfilComponent } from './components/shared/editar-perfil/editar-perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Rutas Voluntario
  {
    path: 'voluntario',
    component: VolunteerLayoutComponent,
    canActivate: [voluntarioGuard],
    children: [
      { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
      { path: 'solicitudes', component: SolicitudesComponent },
      { path: 'mis-ofertas', component: MisOfertasComponent },
      { path: 'historial', component: VoluntarioHistorial },
      { path: 'editar-perfil', component: EditarPerfilComponent }
    ]
  },
  
  // Rutas Adulto Mayor
  {
    path: 'adulto-mayor',
    component: ElderLayoutComponent,
    canActivate: [adultoMayorGuard],
    children: [
      { path: '', redirectTo: 'mis-solicitudes', pathMatch: 'full' },
      { path: 'nueva-solicitud', component: NuevaSolicitudComponent },
      { path: 'mis-solicitudes', component: MisSolicitudesComponent },
      { path: 'historial', component: HistorialAmComponent },
      { path: 'editar-perfil', component: EditarPerfilComponent }
    ]
  },
  
  { path: '**', redirectTo: '/login' }
];
