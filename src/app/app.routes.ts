import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';
import { Home } from './features/home/home';
import { Projects } from './features/projects/projects';
import { Experience } from './features/experience/experience';
import { Skills } from './features/skills/skills';
import { Contact } from './features/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  { path: 'proyectos', component: Projects, title: 'Proyectos' },
  { path: 'experiencia', component: Experience, title: 'Experiencia' },
  { path: 'skills', component: Skills, title: 'Skills' },
  { path: 'contacto', component: Contact, title: 'Contacto' },
  {
    path: 'admin/login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/admin/login/login').then((m) => m.AdminLogin),
    title: 'Admin · Entrar',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin-shell/admin-shell').then((m) => m.AdminShell),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then((m) => m.Dashboard),
        title: 'Admin · Resumen',
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./features/admin/projects-admin/projects-admin').then((m) => m.ProjectsAdmin),
        title: 'Admin · Proyectos',
      },
      {
        path: 'experiencia',
        loadComponent: () =>
          import('./features/admin/experience-admin/experience-admin').then((m) => m.ExperienceAdmin),
        title: 'Admin · Experiencia',
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./features/admin/skills-admin/skills-admin').then((m) => m.SkillsAdmin),
        title: 'Admin · Skills',
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('./features/admin/messages-admin/messages-admin').then((m) => m.MessagesAdmin),
        title: 'Admin · Mensajes',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
