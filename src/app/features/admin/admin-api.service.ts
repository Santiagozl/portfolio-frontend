import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactMessage, Experience, Project, Skill } from '../../core/models';

export type ProjectInput = Omit<Project, 'id'>;
export type ExperienceInput = Omit<Experience, 'id'>;
export type SkillInput = Omit<Skill, 'id'>;

/**
 * Servicio exclusivo del panel admin (rama full-stack): agrupa las
 * operaciones de escritura (crear/editar/borrar) contra la API propia.
 * Se mantiene separado de PortfolioDataService porque ese contrato es
 * solo de lectura y lo comparte también la parte pública del sitio.
 */
@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Proyectos
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  createProject(input: ProjectInput): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, input);
  }

  updateProject(id: number, input: ProjectInput): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, input);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
  }

  // Experiencia
  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  createExperience(input: ExperienceInput): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/experience`, input);
  }

  updateExperience(id: number, input: ExperienceInput): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/experience/${id}`, input);
  }

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/experience/${id}`);
  }

  // Skills
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  createSkill(input: SkillInput): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/skills`, input);
  }

  updateSkill(id: number, input: SkillInput): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/skills/${id}`, input);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/skills/${id}`);
  }

  // Mensajes de contacto
  getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/messages`);
  }

  markMessageRead(id: number, read: boolean): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.apiUrl}/messages/${id}`, { read });
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/messages/${id}`);
  }
}
