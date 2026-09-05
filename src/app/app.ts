import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly scrollProgress = signal(0);

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
