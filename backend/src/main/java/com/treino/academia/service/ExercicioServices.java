package com.treino.academia.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.treino.academia.dto.ExercicioDto;
import com.treino.academia.entity.Exercicio;
import com.treino.academia.entity.Treino;
import com.treino.academia.repository.ExercicioRepository;
import com.treino.academia.repository.TreinoRepository;

@Service
public class ExercicioServices {

    @Autowired private ExercicioRepository exercicioRepository;
    @Autowired private TreinoRepository treinoRepository;

    public ExercicioDto salvar(ExercicioDto dto) {
        Treino treino = treinoRepository.findById(dto.getTreinoId())
            .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
            
        Exercicio exercicio = new Exercicio();
        exercicio.setNome(dto.getNome());
        exercicio.setRepeticoes(dto.getRepeticoes());
        exercicio.setSeries(dto.getSeries());
        exercicio.setCarga(dto.getCarga());
        exercicio.setTreino(treino);
        
        exercicio = exercicioRepository.save(exercicio);
        return toDto(exercicio);
    }

    public List<ExercicioDto> listar() {
        return exercicioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<ExercicioDto> listarPorTreino(Long treinoId) {
        return exercicioRepository.findByTreinoId(treinoId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public ExercicioDto atualizar(Long id, ExercicioDto dto) {
        Exercicio exercicioExistente = exercicioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Exercicio não encontrado"));
            
        exercicioExistente.setNome(dto.getNome());
        exercicioExistente.setRepeticoes(dto.getRepeticoes());
        exercicioExistente.setSeries(dto.getSeries());
        exercicioExistente.setCarga(dto.getCarga());
        
        Treino treino = treinoRepository.findById(dto.getTreinoId())
            .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        exercicioExistente.setTreino(treino);
        
        exercicioExistente = exercicioRepository.save(exercicioExistente);
        return toDto(exercicioExistente);
    }

    public void deletar(Long id) {
        exercicioRepository.deleteById(id);
    }

    public ExercicioDto buscarPorId(Long id) {
        Exercicio exercicio = exercicioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Exercicio não encontrado"));
        return toDto(exercicio);
    }

    private ExercicioDto toDto(Exercicio exercicio) {
        return new ExercicioDto(
            exercicio.getId(),
            exercicio.getNome(),
            exercicio.getRepeticoes(),
            exercicio.getSeries(),
            exercicio.getCarga(),
            exercicio.getTreino().getId()
        );
    }
}
