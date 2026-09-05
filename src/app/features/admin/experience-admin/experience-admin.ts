import { Component, inject, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { Experience } from '../../../core/models';

@Component({
  selector: 'app-experience-admin',
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './experience-admin.html',
  styleUrl: './experience-admin.scss',
})
export class ExperienceAdmin {
  private readonly adminApi = inject(AdminApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly items = signal<Experience[]>([]);
  readonly loading = signal(true);
  readonly editingId = signal<number | null>(null);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    sortOrder: [0],
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.adminApi.getExperience().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudo cargar la experiencia.');
        this.loading.set(false);
      },
    });
  }

  edit(item: Experience): void {
    this.editingId.set(item.id);
    this.form.setValue({
      company: item.company,
      role: item.role,
      description: item.description,
      startDate: item.startDate?.slice(0, 10) ?? '',
      endDate: item.endDate?.slice(0, 10) ?? '',
      sortOrder: item.sortOrder,
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({ company: '', role: '', description: '', startDate: '', endDate: '', sortOrder: 0 });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const input = {
      company: raw.company,
      role: raw.role,
      description: raw.description,
      startDate: raw.startDate,
      endDate: raw.endDate || null,
      sortOrder: Number(raw.sortOrder) || 0,
    };

    this.saving.set(true);
    const editingId = this.editingId();
    const request = editingId
      ? this.adminApi.updateExperience(editingId, input)
      : this.adminApi.createExperience(input);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.cancelEdit();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('No se pudo guardar la experiencia.');
      },
    });
  }

  remove(item: Experience): void {
    if (!confirm(`¿Eliminar la experiencia en "${item.company}"?`)) {
      return;
    }
    this.adminApi.deleteExperience(item.id).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage.set('No se pudo eliminar la experiencia.'),
    });
  }
}
