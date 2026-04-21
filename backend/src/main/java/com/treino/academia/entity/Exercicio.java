package com.treino.academia.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private int repeticoes;
    private int series;
    private int carga;

    @ManyToOne
    @JoinColumn(name = "treino_id")
    private Treino treino;

}
