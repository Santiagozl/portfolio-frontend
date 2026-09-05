import { Observable } from 'rxjs';
import { ContactMessage, Experience, Project, Skill } from '../models';

/**
 * Contrato único para acceder a los datos del portafolio.
 * Cada rama del proyecto provee una implementación distinta:
 * - `StaticDataService` (rama sin backend): lee de JSON locales.
 * - `ApiDataService` (rama full-stack): consume la API REST propia.
 * El resto de la app (componentes) solo depende de esta clase abstracta.
 */
export abstract class PortfolioDataService {
  abstract getProjects(): Observable<Project[]>;
  abstract getExperience(): Observable<Experience[]>;
  abstract getSkills(): Observable<Skill[]>;
  abstract sendMessage(message: ContactMessage): Observable<void>;
}
