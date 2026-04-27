package com.treino.academia.controller;

import com.treino.academia.dto.LoginDto;
import com.treino.academia.dto.LoginResponseDto;
import com.treino.academia.dto.RegistroDto;
import com.treino.academia.dto.UsuarioDto;
import com.treino.academia.entity.Usuario;
import com.treino.academia.service.AuthService;
import com.treino.academia.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDto> cadastrar(@RequestBody @Valid RegistroDto registroDto) {
        // Monta a entidade a partir do DTO (nunca recebe a entidade diretamente da API)
        Usuario usuario = new Usuario();
        usuario.setNome(registroDto.getNome());
        usuario.setEmail(registroDto.getEmail());
        usuario.setSenha(registroDto.getSenha());
        Usuario usuarioSalvo = authService.cadastrar(usuario);
        return ResponseEntity.ok(new UsuarioDto(usuarioSalvo.getId(), usuarioSalvo.getNome(), usuarioSalvo.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginDto loginDto) {
        Usuario usuario = authService.login(loginDto.getEmail(), loginDto.getSenha());
        String token = tokenService.gerarToken(usuario);
        return ResponseEntity.ok(new LoginResponseDto(token, usuario.getId()));
    }
}
