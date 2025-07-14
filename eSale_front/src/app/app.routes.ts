import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } // Redirige rutas no encontradas a la landing
];