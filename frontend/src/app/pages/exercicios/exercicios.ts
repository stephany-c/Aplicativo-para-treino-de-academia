import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExercicioService } from '../../services/exercicio.service';
import { TreinoService } from '../../services/treino.service';
import { Exercicio } from '../../models/exercicio';
import { Treino } from '../../models/treino';

@Component({
  selector: 'app-exercicios',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './exercicios.html'
})
export class Exercicios implements OnInit {
  treinoId!: number;
  treino: Treino | null = null;
  exercicios: Exercicio[] = [];
  exercicioForm: FormGroup;
  mostrandoForm = false;

  constructor(
    private route: ActivatedRoute,
    private exercicioService: ExercicioService,
    private treinoService: TreinoService,
    private fb: FormBuilder
  ) {
    this.exercicioForm = this.fb.group({
      nome: ['', Validators.required],
      series: [3, [Validators.required, Validators.min(1)]],
      repeticoes: [10, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.treinoId = +idParam;
      this.carregarTreino();
      this.carregarExercicios();
    }
  }

  carregarTreino() {
    this.treinoService.buscarPorId(this.treinoId).subscribe({
      next: (t) => this.treino = t,
      error: (err) => console.error('Erro ao carregar o treino', err)
    });
  }

  carregarExercicios() {
    this.exercicioService.listarPorTreino(this.treinoId).subscribe({
      next: (data) => this.exercicios = data,
      error: (err) => console.error('Erro ao carregar exercícios', err)
    });
  }

  toggleForm() {
    this.mostrandoForm = !this.mostrandoForm;
    if (!this.mostrandoForm) {
      this.exercicioForm.reset({ series: 3, repeticoes: 10 });
    }
  }

  salvarExercicio() {
    if (this.exercicioForm.valid) {
      const exercicio: Exercicio = {
        ...this.exercicioForm.value,
        treinoId: this.treinoId
      };
      
      this.exercicioService.criar(exercicio).subscribe({
        next: (novoExercicio) => {
          this.exercicios.push(novoExercicio);
          this.toggleForm();
        },
        error: (err) => console.error('Erro ao criar exercício', err)
      });
    }
  }

  excluirExercicio(id: number) {
    if (confirm('Remover este exercício do treino?')) {
      this.exercicioService.excluir(id).subscribe({
        next: () => {
          this.exercicios = this.exercicios.filter(e => e.id !== id);
        },
        error: (err) => console.error('Erro ao excluir exercício', err)
      });
    }
  }
}
