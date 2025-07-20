import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  constructor(private router: Router) {} // Inyectar Router

  goToLanding() {
    this.router.navigate(['/']); // Redirigir a la landing
  }
}