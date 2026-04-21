package com.treino.academia.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ExercicioDto {

    private Long id;

    @NotBlank(message = "Nome do exercício é obrigatório")
    private String nome;

    @Min(value = 1, message = "Repetições deve ser maior que 0")
    private int repeticoes;

    @Min(value = 1, message = "Séries deve ser maior que 0")
    private int series;

    private int carga;

    @NotNull(message = "O ID do treino é obrigatório")
    private Long treinoId;

    public ExercicioDto() {
    }

    public ExercicioDto(Long id, String nome, int repeticoes, int series, int carga, Long treinoId) {
        this.id = id;
        this.nome = nome;
        this.repeticoes = repeticoes;
        this.series = series;
        this.carga = carga;
        this.treinoId = treinoId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getRepeticoes() { return repeticoes; }
    public void setRepeticoes(int repeticoes) { this.repeticoes = repeticoes; }

    public int getSeries() { return series; }
    public void setSeries(int series) { this.series = series; }

    public int getCarga() { return carga; }
    public void setCarga(int carga) { this.carga = carga; }

    public Long getTreinoId() { return treinoId; }
    public void setTreinoId(Long treinoId) { this.treinoId = treinoId; }
}
