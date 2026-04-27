import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TreinoService } from '../../services/treino.service';
import { AuthService } from '../../services/auth.service';
import { Treino } from '../../models/treino';

@Component({
  selector: 'app-treinos',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './treinos.html'
})
export class Treinos implements OnInit {
  treinos: Treino[] = [];
  treinoForm: FormGroup;
  mostrandoForm = false;
  // Guarda o treino que está sendo editado (null = modo criação)
  treinoEditando: Treino | null = null;

  constructor(
    private treinoService: TreinoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.treinoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarTreinos();
  }

  carregarTreinos() {
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.treinoService.listarPorUsuario(usuarioId).subscribe({
        next: (data) => this.treinos = data,
        error: (err) => console.error('Erro ao carregar treinos', err)
      });
    }
  }

  toggleForm() {
    this.mostrandoForm = !this.mostrandoForm;
    if (!this.mostrandoForm) {
      // Ao fechar o form, limpa o modo de edição
      this.treinoForm.reset();
      this.treinoEditando = null;
    }
  }

  // Abre o formulário preenchido com os dados do treino para edição
  iniciarEdicao(treino: Treino) {
    this.treinoEditando = treino;
    this.treinoForm.setValue({
      nome: treino.nome,
      descricao: treino.descricao
    });
    this.mostrandoForm = true;
  }

  salvarTreino() {
    if (this.treinoForm.valid) {
      const usuarioId = this.authService.getUsuarioId();

      if (this.treinoEditando && this.treinoEditando.id) {
        // MODO EDIÇÃO: chama PUT /treino/:id
        const treinoAtualizado: Treino = {
          ...this.treinoForm.value,
          usuarioId: usuarioId
        };
        this.treinoService.atualizar(this.treinoEditando.id, treinoAtualizado).subscribe({
          next: (treino) => {
            // Substitui o treino antigo na lista pelo atualizado
            const idx = this.treinos.findIndex(t => t.id === treino.id);
            if (idx !== -1) this.treinos[idx] = treino;
            this.toggleForm();
          },
          error: (err) => console.error('Erro ao atualizar treino', err)
        });
      } else {
        // MODO CRIAÇÃO: chama POST /treino
        const treino: Treino = {
          ...this.treinoForm.value,
          usuarioId: usuarioId
        };
        this.treinoService.criar(treino).subscribe({
          next: (novoTreino) => {
            this.treinos.push(novoTreino);
            this.toggleForm();
          },
          error: (err) => console.error('Erro ao criar treino', err)
        });
      }
    }
  }

  excluirTreino(id: number) {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      this.treinoService.excluir(id).subscribe({
        next: () => {
          this.treinos = this.treinos.filter(t => t.id !== id);
        },
        error: (err) => console.error('Erro ao excluir treino', err)
      });
    }
  }
}
