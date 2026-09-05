import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly year = new Date().getFullYear();

  readonly socialLinks = [
    { label: 'GitHub', url: 'https://github.com/tu-usuario' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario' },
    { label: 'Email', url: 'mailto:tu-correo@ejemplo.com' },
  ];
}
