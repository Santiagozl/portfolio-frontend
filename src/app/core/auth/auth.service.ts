import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'portfolio_admin_token';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.apiUrl;

  readonly loggedIn = signal(this.hasStoredToken());

  token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return Boolean(this.token());
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(({ token }) => {
          localStorage.setItem(TOKEN_KEY, token);
          this.loggedIn.set(true);
        })
      );
  }

  logout(redirectToLogin = true): void {
    localStorage.removeItem(TOKEN_KEY);
    this.loggedIn.set(false);

    if (redirectToLogin) {
      void this.router.navigateByUrl('/admin/login');
    }
  }

  private hasStoredToken(): boolean {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  }
}
