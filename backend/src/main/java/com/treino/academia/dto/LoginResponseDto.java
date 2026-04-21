package com.treino.academia.dto;

public class LoginResponseDto {

    private String token;
    private Long usuarioId;

    public LoginResponseDto(String token, Long usuarioId) {
        this.token = token;
        this.usuarioId = usuarioId;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
