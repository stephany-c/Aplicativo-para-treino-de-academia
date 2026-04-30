import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html'
})
export class Cadastro {
  cadastroForm: FormGroup;
  errorMessage: string = '';
  showSenha = false;
  showSenha2 = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senha2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit() {
    if (this.cadastroForm.valid) {
      // Removemos a senha2 antes de enviar para o backend
      const { senha2, ...dadosCadastro } = this.cadastroForm.value;

      this.authService.cadastrar(dadosCadastro).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          this.errorMessage = 'Erro ao realizar cadastro. Tente outro email.';
        }
      });
    }
  }
  validaSenhas() {
    const senha = this.cadastroForm.get('senha')?.value;
    const senha2 = this.cadastroForm.get('senha2')?.value;

    if (senha !== senha2) {
      this.cadastroForm.get('senha2')?.setErrors({ senhasDiferentes: true });
    } else {
      const control = this.cadastroForm.get('senha2');
      if (control?.hasError('senhasDiferentes')) {
        control.setErrors(null);
        control.updateValueAndValidity();
      }
    }
  }



}
