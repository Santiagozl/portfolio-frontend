import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminApiService } from '../admin-api.service';

interface DashboardCounts {
  projects: number;
  experience: number;
  skills: number;
  unreadMessages: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly adminApi = inject(AdminApiService);

  readonly counts = signal<DashboardCounts | null>(null);
  readonly loading = signal(true);

  constructor() {
    forkJoin({
      projects: this.adminApi.getProjects(),
      experience: this.adminApi.getExperience(),
      skills: this.adminApi.getSkills(),
      messages: this.adminApi.getMessages(),
    }).subscribe({
      next: ({ projects, experience, skills, messages }) => {
        this.counts.set({
          projects: projects.length,
          experience: experience.length,
          skills: skills.length,
          unreadMessages: messages.filter((message) => !message.read).length,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
