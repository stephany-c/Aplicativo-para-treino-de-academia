import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, DialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
