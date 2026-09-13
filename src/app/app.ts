import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  readonly scrollProgress = signal(0);
  readonly isAdminArea = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/admin')),
      startWith(this.router.url.startsWith('/admin'))
    ),
    { initialValue: false }
  );

  constructor() {
    this.updateScrollProgress();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollProgress();
  }

  private updateScrollProgress(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const doc = document.documentElement;
    const scrollableHeight = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / scrollableHeight, 1);
    this.scrollProgress.set(progress * 100);
  }
}
