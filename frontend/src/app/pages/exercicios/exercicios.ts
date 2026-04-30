import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExercicioService } from '../../services/exercicio.service';
import { TreinoService } from '../../services/treino.service';
import { Treino } from '../../models/treino';
import { Exercicio } from '../../models/exercicio';

@Component({
  selector: 'app-exercicios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './exercicios.html'
})
export class Exercicios implements OnInit, OnDestroy {
  treinoId!: number;
  treino: Treino | null = null;
  exercicios: Exercicio[] = [];
  exercicioForm: FormGroup;
  mostrandoForm = false;
  exercicioEditando: Exercicio | null = null;

  // Estados do Modo Treino
  treinoAtivo = false;
  tempoSegundos = 0;
  intervaloTimer: any;
  exerciciosConcluidos = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private exercicioService: ExercicioService,
    private treinoService: TreinoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.exercicioForm = this.fb.group({
      nome: ['', Validators.required],
      series: [3, [Validators.required, Validators.min(1)]],
      repeticoes: [10, [Validators.required, Validators.min(1)]],
      carga: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.treinoId = +id;
        this.carregarTreino();
        this.carregarExercicios();
      }
    });
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  carregarTreino() {
    this.treinoService.buscarPorId(this.treinoId).subscribe({
      next: (t) => {
        this.treino = t;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar treino:', err)
    });
  }

  carregarExercicios() {
    this.exercicioService.listarPorTreino(this.treinoId).subscribe({
      next: (data) => {
        this.exercicios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar exercícios:', err)
    });
  }

  // --- Lógica de Exercícios ---
  toggleForm() {
    this.mostrandoForm = !this.mostrandoForm;
    if (!this.mostrandoForm) {
      this.cancelarEdicao();
    }
    this.cdr.detectChanges();
  }

  iniciarEdicao(exercicio: Exercicio) {
    this.exercicioEditando = exercicio;
    this.mostrandoForm = true;
    this.exercicioForm.patchValue({
      nome: exercicio.nome,
      series: exercicio.series,
      repeticoes: exercicio.repeticoes,
      carga: exercicio.carga
    });
    this.cdr.detectChanges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicao() {
    this.exercicioEditando = null;
    this.exercicioForm.reset({
      nome: '',
      series: 3,
      repeticoes: 10,
      carga: 0
    });
  }

  salvarExercicio() {
    if (this.exercicioForm.valid) {
      const dados = { ...this.exercicioForm.value, treinoId: this.treinoId };

      if (this.exercicioEditando) {
        this.exercicioService.atualizar(this.exercicioEditando.id!, dados).subscribe({
          next: (atualizado) => {
            const index = this.exercicios.findIndex(e => e.id === atualizado.id);
            if (index !== -1) this.exercicios[index] = atualizado;
            this.toggleForm();
            this.cdr.detectChanges();
          }
        });
      } else {
        this.exercicioService.criar(dados).subscribe({
          next: (novo) => {
            this.exercicios.unshift(novo);
            this.toggleForm();
            this.cdr.detectChanges();
          }
        });
      }
    }
  }

  excluirExercicio(id: number) {
    if (confirm('Deseja excluir este exercício?')) {
      this.exercicioService.excluir(id).subscribe({
        next: () => {
          this.exercicios = this.exercicios.filter(e => e.id !== id);
          this.cdr.detectChanges();
        }
      });
    }
  }

  mover(index: number, direcao: 'cima' | 'baixo') {
    const novoIndex = direcao === 'cima' ? index - 1 : index + 1;
    if (novoIndex >= 0 && novoIndex < this.exercicios.length) {
      const temp = this.exercicios[index];
      this.exercicios[index] = this.exercicios[novoIndex];
      this.exercicios[novoIndex] = temp;
      this.cdr.detectChanges();
    }
  }

  // --- Lógica de MODO TREINO ---
  iniciarTreino() {
    this.treinoAtivo = true;
    this.tempoSegundos = 0;
    this.exerciciosConcluidos.clear();
    this.iniciarTimer();
    this.cdr.detectChanges();
  }

  finalizarTreino() {
    this.pararTimer();
    const tempoFormatado = this.getTempoFormatado();
    alert(`Parabéns! Treino concluído em ${tempoFormatado}.`);
    this.treinoAtivo = false;
    this.exerciciosConcluidos.clear();
    this.cdr.detectChanges();
  }

  alternarConclusao(id: number) {
    if (this.exerciciosConcluidos.has(id)) {
      this.exerciciosConcluidos.delete(id);
    } else {
      this.exerciciosConcluidos.add(id);
    }
    this.cdr.detectChanges();
  }

  getProgresso(): number {
    if (this.exercicios.length === 0) return 0;
    return Math.round((this.exerciciosConcluidos.size / this.exercicios.length) * 100);
  }

  getTempoFormatado(): string {
    const m = Math.floor(this.tempoSegundos / 60);
    const s = this.tempoSegundos % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  private iniciarTimer() {
    this.intervaloTimer = setInterval(() => {
      this.tempoSegundos++;
      this.cdr.detectChanges();
    }, 1000);
  }

  private pararTimer() {
    if (this.intervaloTimer) {
      clearInterval(this.intervaloTimer);
    }
  }
}
