import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  private readonly auth = inject(AuthService);

  readonly links = [
    { path: '/admin', label: 'Resumen' },
    { path: '/admin/proyectos', label: 'Proyectos' },
    { path: '/admin/experiencia', label: 'Experiencia' },
    { path: '/admin/skills', label: 'Skills' },
    { path: '/admin/mensajes', label: 'Mensajes' },
  ];

  logout(): void {
    this.auth.logout();
  }
}
