import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { UserService, CriarUsuarioDto } from '../../../../core/services/afiliados-repository/user-repository/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;

  erro = '';

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      cpf: ['', [Validators.required, this.cpfValidator]],
      telefone: ['', Validators.pattern(/^\d{10,11}$/)],
      endereco: this.fb.group({
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        pais: ['', Validators.required]
      })
    });
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value ? control.value.replace(/\D/g, '') : '';
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return { cpf: true };
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== Number(cpf.charAt(9))) return { cpf: true };
    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== Number(cpf.charAt(10))) return { cpf: true };
    return null;
  }

  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: CriarUsuarioDto = { ...(this.form.value as any), role: 'aluno' };
    this.userService.registrar(dto).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.erro = 'Erro ao registrar'
    });
  }
}
