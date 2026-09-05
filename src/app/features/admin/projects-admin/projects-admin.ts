import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-projects-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './projects-admin.html',
  styleUrl: './projects-admin.scss',
})
export class ProjectsAdmin {
  private readonly adminApi = inject(AdminApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly editingId = signal<number | null>(null);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: [''],
    projectUrl: [''],
    repoUrl: [''],
    technologies: [''],
    sortOrder: [0],
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.adminApi.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los proyectos.');
        this.loading.set(false);
      },
    });
  }

  edit(project: Project): void {
    this.editingId.set(project.id);
    this.form.setValue({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl ?? '',
      projectUrl: project.projectUrl ?? '',
      repoUrl: project.repoUrl ?? '',
      technologies: project.technologies.join(', '),
      sortOrder: project.sortOrder,
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({ title: '', description: '', imageUrl: '', projectUrl: '', repoUrl: '', technologies: '', sortOrder: 0 });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const input = {
      title: raw.title,
      description: raw.description,
      imageUrl: raw.imageUrl || undefined,
      projectUrl: raw.projectUrl || undefined,
      repoUrl: raw.repoUrl || undefined,
      technologies: raw.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      sortOrder: Number(raw.sortOrder) || 0,
    };

    this.saving.set(true);
    const editingId = this.editingId();
    const request = editingId
      ? this.adminApi.updateProject(editingId, input)
      : this.adminApi.createProject(input);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.cancelEdit();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('No se pudo guardar el proyecto.');
      },
    });
  }

  remove(project: Project): void {
    if (!confirm(`¿Eliminar el proyecto "${project.title}"?`)) {
      return;
    }
    this.adminApi.deleteProject(project.id).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage.set('No se pudo eliminar el proyecto.'),
    });
  }
}
