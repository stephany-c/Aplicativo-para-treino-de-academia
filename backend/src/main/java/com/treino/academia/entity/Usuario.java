package com.treino.academia.entity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // define que o id será gerado automaticamente pelo banco
    private Long id;
    private String nome;
    @Column(unique = true) // diz ao banco que não pode ter valor repetido
    private String email;
    private String senha;
}