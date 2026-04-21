package com.treino.academia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.treino.academia.dto.TreinoDto;
import com.treino.academia.service.TreinoServices;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/treino")
public class TreinoController {

    private final TreinoServices treinoServices;

    @Autowired
    public TreinoController(TreinoServices treinoServices) {
        this.treinoServices = treinoServices;
    }

    @PostMapping
    public ResponseEntity<TreinoDto> salvar(@RequestBody @Valid TreinoDto treinoDto) {
        return ResponseEntity.ok(treinoServices.salvar(treinoDto));
    }

    @GetMapping
    public ResponseEntity<List<TreinoDto>> listar() {
        return ResponseEntity.ok(treinoServices.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreinoDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(treinoServices.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreinoDto> atualizar(@PathVariable Long id, @RequestBody @Valid TreinoDto treinoDto) {
        return ResponseEntity.ok(treinoServices.atualizar(id, treinoDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        treinoServices.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
