import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ContactMessage, Experience, Project, Skill } from '../models';
import { PortfolioDataService } from './portfolio-data.service';

/**
 * Implementación que consume la API propia (Express + PostgreSQL).
 * Mantiene exactamente el mismo contrato que StaticDataService, por lo
 * que ningún componente de la app necesita saber cuál está activa.
 */
@Injectable({ providedIn: 'root' })
export class ApiDataService implements PortfolioDataService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  sendMessage(message: ContactMessage): Observable<void> {
    return this.http
      .post(`${this.apiUrl}/messages`, message)
      .pipe(map(() => void 0));
  }
}
