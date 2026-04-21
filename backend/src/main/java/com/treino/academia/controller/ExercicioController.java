package com.treino.academia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.treino.academia.dto.ExercicioDto;
import com.treino.academia.service.ExercicioServices;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/exercicios")
public class ExercicioController {

    private final ExercicioServices exercicioServices;

    @Autowired
    public ExercicioController(ExercicioServices exercicioServices) {
        this.exercicioServices = exercicioServices;
    }

    @GetMapping
    public ResponseEntity<List<ExercicioDto>> listar() {
        return ResponseEntity.ok(exercicioServices.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExercicioDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(exercicioServices.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ExercicioDto> salvar(@RequestBody @Valid ExercicioDto exercicioDto) {
        return ResponseEntity.ok(exercicioServices.salvar(exercicioDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExercicioDto> atualizar(@PathVariable Long id, @RequestBody @Valid ExercicioDto exercicioDto) {
        return ResponseEntity.ok(exercicioServices.atualizar(id, exercicioDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        exercicioServices.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
