import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../admin-api.service';
import { Skill } from '../../../core/models';

@Component({
  selector: 'app-skills-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './skills-admin.html',
  styleUrl: './skills-admin.scss',
})
export class SkillsAdmin {
  private readonly adminApi = inject(AdminApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly skills = signal<Skill[]>([]);
  readonly loading = signal(true);
  readonly editingId = signal<number | null>(null);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    level: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    icon: [''],
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.adminApi.getSkills().subscribe({
      next: (skills) => {
        this.skills.set(skills);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar las skills.');
        this.loading.set(false);
      },
    });
  }

  edit(skill: Skill): void {
    this.editingId.set(skill.id);
    this.form.setValue({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon ?? '',
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({ name: '', category: '', level: 3, icon: '' });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const input = {
      name: raw.name,
      category: raw.category,
      level: Number(raw.level),
      icon: raw.icon || undefined,
    };

    this.saving.set(true);
    const editingId = this.editingId();
    const request = editingId
      ? this.adminApi.updateSkill(editingId, input)
      : this.adminApi.createSkill(input);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.cancelEdit();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('No se pudo guardar la skill.');
      },
    });
  }

  remove(skill: Skill): void {
    if (!confirm(`¿Eliminar la skill "${skill.name}"?`)) {
      return;
    }
    this.adminApi.deleteSkill(skill.id).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage.set('No se pudo eliminar la skill.'),
    });
  }
}
