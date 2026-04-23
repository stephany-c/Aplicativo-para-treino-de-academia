import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TreinoService } from '../../services/treino.service';
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

  constructor(
    private treinoService: TreinoService,
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
    this.treinoService.listar().subscribe({
      next: (data) => this.treinos = data,
      error: (err) => console.error('Erro ao carregar treinos', err)
    });
  }

  toggleForm() {
    this.mostrandoForm = !this.mostrandoForm;
    if (!this.mostrandoForm) {
      this.treinoForm.reset();
    }
  }

  salvarTreino() {
    if (this.treinoForm.valid) {
      this.treinoService.criar(this.treinoForm.value).subscribe({
        next: (novoTreino) => {
          this.treinos.push(novoTreino);
          this.toggleForm();
        },
        error: (err) => console.error('Erro ao criar treino', err)
      });
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
