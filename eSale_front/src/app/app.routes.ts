import { Routes } from '@angular/router';
import { Hero } from './hero/hero';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Hero },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' } // Redirige rutas no encontradas a la landing
];