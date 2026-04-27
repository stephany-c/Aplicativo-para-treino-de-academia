package com.treino.academia.repository;

import com.treino.academia.entity.Treino;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TreinoRepository extends JpaRepository<Treino, Long> {

    List<Treino> findByUsuarioId(Long usuarioId);

}
