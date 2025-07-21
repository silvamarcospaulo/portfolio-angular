import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AdminService } from '../../../../core/services/afiliados-repository/admin-repository/admin-repository.service';

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
    private adminService: AdminService,
    private router: Router
  ) { }

  login() {
    this.adminService.login({ usuario: this.usuario, senha: this.senha })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/painel']);
        },
        error: () => {
          this.erro = 'Usuário ou senha inválidos';
        }
      });
  }
}