package com.treino.academia.service;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import com.treino.academia.dto.TreinoDto;
import com.treino.academia.dto.ExercicioDto;
import com.treino.academia.entity.Treino;
import com.treino.academia.entity.Usuario;
import com.treino.academia.entity.Exercicio;
import com.treino.academia.repository.TreinoRepository;
import com.treino.academia.repository.UsuarioRepository;

@Service
public class TreinoServices {

    @Autowired private TreinoRepository treinoRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    public TreinoDto salvar(TreinoDto dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        
        Treino treino = new Treino();
        treino.setNome(dto.getNome());
        treino.setDescricao(dto.getDescricao());
        treino.setUsuario(usuario);
        
        treino = treinoRepository.save(treino);
        return toDto(treino);
    }

    public List<TreinoDto> listar() {
        return treinoRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<TreinoDto> listarPorUsuario(Long usuarioId) {
        return treinoRepository.findByUsuarioId(usuarioId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public TreinoDto atualizar(Long id, TreinoDto dto) {
        Treino treinoExistente = treinoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        
        treinoExistente.setNome(dto.getNome());
        treinoExistente.setDescricao(dto.getDescricao());
        
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        treinoExistente.setUsuario(usuario);
        
        treinoExistente = treinoRepository.save(treinoExistente);
        return toDto(treinoExistente);
    }

    public void deletar(Long id) {
        treinoRepository.deleteById(id);
    }

    public TreinoDto buscarPorId(Long id) {
        Treino treino = treinoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        return toDto(treino);
    }

    private TreinoDto toDto(Treino treino) {
        List<ExercicioDto> exercicios = null;
        if (treino.getExercicios() != null) {
            exercicios = treino.getExercicios().stream().map(e -> 
                new ExercicioDto(e.getId(), e.getNome(), e.getRepeticoes(), e.getSeries(), e.getCarga(), treino.getId())
            ).collect(Collectors.toList());
        }
        
        return new TreinoDto(
            treino.getId(), 
            treino.getNome(), 
            treino.getDescricao(), 
            treino.getUsuario().getId(), 
            exercicios
        );
    }
}
