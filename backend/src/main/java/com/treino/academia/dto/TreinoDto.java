package com.treino.academia.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class TreinoDto {

    private Long id;

    @NotBlank(message = "O nome do treino é obrigatório")
    private String nome;

    private String descricao;

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    private List<ExercicioDto> exercicios;

    public TreinoDto() {
    }

    public TreinoDto(Long id, String nome, String descricao, Long usuarioId, List<ExercicioDto> exercicios) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.usuarioId = usuarioId;
        this.exercicios = exercicios;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public List<ExercicioDto> getExercicios() { return exercicios; }
    public void setExercicios(List<ExercicioDto> exercicios) { this.exercicios = exercicios; }
}
