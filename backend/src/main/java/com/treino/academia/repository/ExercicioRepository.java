package com.treino.academia.repository;

import com.treino.academia.entity.Exercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExercicioRepository extends JpaRepository<Exercicio, Long> {

    List<Exercicio> findByTreinoId(Long treinoId);

}
