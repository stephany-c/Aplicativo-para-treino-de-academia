import { Exercicio } from './exercicio';

export interface Treino {
  id?: number;
  nome: string;
  descricao: string;
  usuarioId?: number;
  exercicios?: Exercicio[]; // lista de exercícios retornada pelo backend
}
