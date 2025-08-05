import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/afiliados-repository/auth-repository/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario = '';
  senha = '';
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login({ usuario: this.usuario, senha: this.senha })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          if (payload.role === 'adm') {
            this.router.navigate(['/painel']);
          } else {
            this.router.navigate(['/universidade/dashboard']);
          }
        },
        error: () => {
          this.erro = 'Usuário ou senha inválidos';
        }
      });
  }
}
