import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarLink } from '../../components/shared/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-volunteer-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './volunteer-layout.component.html',
  styleUrls: ['./volunteer-layout.component.css']
})
export class VolunteerLayoutComponent implements OnInit {
  user: any;
  links: SidebarLink[] = [
    { path: '/voluntario/solicitudes', label: 'Solicitudes' },
    { path: '/voluntario/mis-ofertas', label: 'Mis Ofertas' },
    { path: '/voluntario/historial', label: 'Historial' }
  ];

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  @HostListener('window:storage')
  onStorageChange(): void {
    this.user = this.authService.getUser();
  }

  private loadUser(): void {
    this.user = this.authService.getUser();
    this.perfilService.getPerfil().subscribe({
      next: (profile) => {
        if (profile) {
          this.user = {
            ...this.user,
            nombre: profile.nombre,
            foto: profile.foto_perfil,
            promedio_calificaciones: profile.promedio_calificaciones
          };
          sessionStorage.setItem('user', JSON.stringify(this.user));
        }
      },
      error: (err) => {
        console.error('Error al cargar perfil en layout de voluntario:', err);
      }
    });
  }
}
