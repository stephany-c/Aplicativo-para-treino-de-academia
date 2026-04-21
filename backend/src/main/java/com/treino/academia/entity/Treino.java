package com.treino.academia.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Treino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @ManyToOne // define que um treino pertence a um usuario
    @JoinColumn(name = "usuario_id") // define que a coluna usuario_id será usada para fazer o join com a tabela
                                     // usuario
    private Usuario usuario;
    @OneToMany(mappedBy = "treino", cascade = CascadeType.ALL, orphanRemoval = true) // define o relacionamento bidirecional e que o treino é o 'dono'
    private List<Exercicio> exercicios;

}