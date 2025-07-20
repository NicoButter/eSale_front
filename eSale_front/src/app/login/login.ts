import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  constructor(private router: Router) {} // Inyectar Router

  goToLanding() {
    this.router.navigate(['/']); // Redirigir a la landing
  }
}