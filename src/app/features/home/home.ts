import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly dataService = inject(PortfolioDataService);

  readonly featuredProjects$ = this.dataService
    .getProjects()
    .pipe(map((projects) => projects.slice(0, 2)));

  readonly photoUrl = '/images/profile.jpeg';
  readonly aboutPhotoUrl = '/images/foto3.jpeg';
  readonly photoFailed = signal(false);

  onPhotoError(): void {
    this.photoFailed.set(true);
  }
}
