export interface Exercicio {
  id?: number;
  nome: string;
  series: number;
  repeticoes: number;
  carga?: number;
  treinoId?: number;
}
