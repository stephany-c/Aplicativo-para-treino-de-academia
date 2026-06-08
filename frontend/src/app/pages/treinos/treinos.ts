import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TreinoService } from '../../services/treino.service';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../services/dialog.service';
import { Treino } from '../../models/treino';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-treinos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './treinos.html'
})
export class Treinos implements OnInit, OnDestroy {
  treinos: Treino[] = [];
  treinoForm: FormGroup;
  mostrandoForm = false;
  treinoEditando: Treino | null = null;
  private sub = new Subscription();

  constructor(
    private treinoService: TreinoService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    this.treinoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Escuta o fluxo de ID do usuário para carregar dados automaticamente após o login
    this.sub.add(
      this.authService.usuarioId$.subscribe(id => {
        if (id) {
          this.carregarTreinos(id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  carregarTreinos(usuarioId: number) {
    this.treinoService.listarPorUsuario(usuarioId).subscribe({
      next: (data) => {
        this.treinos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar treinos:', err);
        if (err.status === 403 || err.status === 401) {
          alert('Sessão expirada ou erro de permissão. Por favor, faça login novamente.');
        }
      }
    });
  }

  toggleForm() {
    this.mostrandoForm = !this.mostrandoForm;
    if (!this.mostrandoForm) {
      this.treinoForm.reset();
      this.treinoEditando = null;
    }
    this.cdr.detectChanges();
  }

  iniciarEdicao(treino: Treino) {
    this.treinoEditando = treino;
    this.treinoForm.setValue({
      nome: treino.nome,
      descricao: treino.descricao
    });
    this.mostrandoForm = true;
    this.cdr.detectChanges();
  }

  salvarTreino() {
    if (this.treinoForm.valid) {
      const usuarioId = this.authService.getUsuarioId();

      if (this.treinoEditando && this.treinoEditando.id) {
        const treinoAtualizado: Treino = {
          ...this.treinoForm.value,
          usuarioId: usuarioId!
        };
        this.treinoService.atualizar(this.treinoEditando.id, treinoAtualizado).subscribe({
          next: (treino) => {
            const idx = this.treinos.findIndex(t => t.id === treino.id);
            if (idx !== -1) this.treinos[idx] = treino;
            this.toggleForm();
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Erro ao atualizar treino', err)
        });
      } else {
        const treino: Treino = {
          ...this.treinoForm.value,
          usuarioId: usuarioId!
        };
        this.treinoService.criar(treino).subscribe({
          next: (novoTreino) => {
            this.treinos.unshift(novoTreino);
            this.toggleForm();
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Erro ao criar treino', err)
        });
      }
    }
  }

  excluirTreino(id: number) {
    this.dialogService.danger(
      'Excluir Treino',
      'Tem certeza? Esta ação não poderá ser desfeita.',
      'Sim, excluir'
    ).then(confirmado => {
      if (!confirmado) return;
      this.treinoService.excluir(id).subscribe({
        next: () => {
          this.treinos = this.treinos.filter(t => t.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erro ao excluir treino', err)
      });
    });
  }
}
