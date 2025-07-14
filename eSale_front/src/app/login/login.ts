import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {}