import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  readonly links = [
    { path: '/admin', label: 'Resumen' },
    { path: '/admin/proyectos', label: 'Proyectos' },
    { path: '/admin/experiencia', label: 'Experiencia' },
    { path: '/admin/skills', label: 'Skills' },
    { path: '/admin/mensajes', label: 'Mensajes' },
  ];
}
