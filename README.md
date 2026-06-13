# Academia - Sistema de Gestão de Treinos Personalizados 🏋️‍♂️💪

O **Academia** é um sistema Full Stack moderno e robusto projetado para o gerenciamento de treinos de musculação e exercícios físicos. Desenvolvido com **Java (Spring Boot)** no backend e **Angular** integrado com **Tailwind CSS v4** no frontend, a aplicação oferece uma interface elegante, de alta performance e totalmente responsiva, ideal para acompanhar treinos no celular ou desktop de forma dinâmica e segura.

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-green)
![Angular](https://img.shields.io/badge/Angular-21.1.0-DD0031?logo=angular)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-6DB33F?logo=springboot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)
![JWT](https://img.shields.io/badge/JWT-Auth0-black?logo=jsonwebtokens)

---

### 🔗 Link do projeto em produção
Acesse a aplicação hospedada: [https://aplicativo-para-treino-de-academia.onrender.com](https://aplicativo-para-treino-de-academia.onrender.com)

---

## 🛠️ Tecnologias Utilizadas

Este projeto está dividido em duas partes principais: um frontend construído com **Angular 21** e um backend em **Spring Boot 4.0.5**.

| Componente | Tecnologia | Versão |
| :--- | :--- | :--- |
| **Frontend** | Angular | 21.1.0 |
| | Tailwind CSS | 4.1.12 |
| | TypeScript | 5.9.2 |
| | Vitest (Testes) | 4.0.8 |
| | RxJS | 7.8.0 |
| **Backend** | Java | 17 |
| | Spring Boot | 4.0.5 |
| | Spring Security | Integrado |
| | Spring Data JPA | Integrado |
| | JWT (Auth0) | 4.4.0 |
| | Maven (mvnw) | Integrado |
| | Springdoc OpenAPI | 2.5.0 |
| **Banco de Dados**| PostgreSQL | 15 (Docker) / 15+ (Local) |

---

## ✨ Funcionalidades Principais

* 🔒 **Autenticação JWT**: Registro de novos usuários e login seguro com controle de sessão e tokens JWT.
* 🏋️‍♂️ **Gestão de Treinos (CRUD)**: Criação, listagem, edição e exclusão de treinos vinculados ao usuário autenticado.
* 📋 **Gestão de Exercícios (CRUD)**: Cadastro completo de exercícios com séries, repetições e carga, associados de forma dinâmica aos treinos.
* 👥 **Isolamento de Dados**: Cada usuário possui acesso exclusivo aos seus próprios treinos cadastrados.
* 🎨 **UI/UX Premium**: Layout responsivo com design moderno e limpo utilizando Tailwind CSS v4, otimizado para dispositivos móveis e computadores.
* ⚡ **Swagger/OpenAPI**: Documentação interativa para teste direto dos endpoints da API.

---

## 🚀 Instalação e Execução

Você pode rodar o projeto de duas formas: utilizando **Docker** (recomendado para praticidade) ou por **Instalação Manual**.

### Opção 1: Utilizando Docker 🐳

As configurações necessárias já estão inclusas no repositório.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/stephany-c/Aplicativo-para-treino-de-academia.git
   cd Aplicativo-para-treino-de-academia
   ```

2. **Suba os containers:**
   ```bash
   docker compose up -d --build
   ```

3. **Acesse a aplicação:**
   * **Frontend:** [http://localhost](http://localhost) (Porta 80)
   * **Backend API:** [http://localhost:8080](http://localhost:8080)
   * **Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### Opção 2: Instalação Manual 🛠️

Pré-requisitos mínimos: **Java 17**, **Maven 3.8+**, **Node.js (v18+)**, **PostgreSQL** instalado e ativo localmente.

#### 1. Configuração do Banco de Dados
* Crie um banco de dados local com o nome `academia`.
* Por padrão, a aplicação busca o banco com a URL `jdbc:postgresql://localhost:5432/academia`, utilizando o usuário `postgres` e a senha `1234`. Se necessário, ajuste no arquivo [application.properties](file:///c:/Users/sterc/Desktop/academia/backend/src/main/resources/application.properties) ou configure as seguintes variáveis de ambiente:
  ```env
  SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/sua_database
  SPRING_DATASOURCE_USERNAME=seu_usuario
  SPRING_DATASOURCE_PASSWORD=sua_senha
  ```

#### 2. Executar o Backend (API)
Abra um terminal na pasta do backend e execute:
```bash
cd backend
# No Linux/macOS:
./mvnw spring-boot:run

# No Windows (CMD ou PowerShell):
./mvnw.cmd spring-boot:run
```

#### 3. Executar o Frontend
Abra outro terminal na pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento:
```bash
cd frontend
npm install
npm start
```
* O frontend estará disponível em [http://localhost:4200](http://localhost:4200).

---

## 📑 Documentação da API (Swagger)

A API possui documentação dinâmica e interativa gerada pelo Springdoc OpenAPI.
* **Acesse em:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 📁 Estrutura do Repositório

* `backend/` — Código-fonte da API em Spring Boot.
* `frontend/` — Código-fonte do painel do usuário em Angular.
* `docker-compose.yml` — Arquivo de orquestração para subir os serviços em Docker de forma unificada.

---

Desenvolvido por [Stephany](https://github.com/stephany-c)
