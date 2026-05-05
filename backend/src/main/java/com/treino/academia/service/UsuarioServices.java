package com.treino.academia.service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.treino.academia.dto.UsuarioDto;
import com.treino.academia.entity.Usuario;
import com.treino.academia.repository.UsuarioRepository;

@Service
public class UsuarioServices {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioServices(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioDto> listar() {
        return usuarioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public UsuarioDto buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        return toDto(usuario);
    }

    public UsuarioDto atualizar(Long id, UsuarioDto dto) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        usuarioExistente.setNome(dto.getNome());
        usuarioExistente.setEmail(dto.getEmail());
        
        usuarioExistente = usuarioRepository.save(usuarioExistente);
        return toDto(usuarioExistente);
    }

    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }

    private UsuarioDto toDto(Usuario usuario) {
        return new UsuarioDto(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}
