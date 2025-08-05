import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/afiliados-repository/user-repository/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  nomeCompleto = '';
  email = '';
  senha = '';
  erro = '';

  constructor(private userService: UserService, private router: Router) { }

  registrar() {
    this.userService.registrar({ nomeCompleto: this.nomeCompleto, email: this.email, senha: this.senha })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.erro = 'Erro ao registrar'
      });
  }
}
