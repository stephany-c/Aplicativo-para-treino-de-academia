import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Treinos } from './pages/treinos/treinos';
import { Exercicios } from './pages/exercicios/exercicios';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'treinos', component: Treinos, canActivate: [authGuard] },
  { path: 'treinos/:id', component: Exercicios, canActivate: [authGuard] }
];
