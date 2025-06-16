## 🚀 Tecnologias Utilizadas

- PHP 8.2 + Laravel 10
- MySQL 8
- JWT Auth (`tymon/jwt-auth`)
- PHPUnit com SQLite (para testes)
- Docker & Docker Compose

---

## 📦 Instalação em ambiente local

### 1. Clone o repositório

```bash
git clone https://github.com/jeanmarcos552/app-receitas-api.git
cd app-receitas-api 
```
### 2. Suba os containers com Docker

```bash
docker compose up --build
```

### 3. Copie o arquivo .env e instale dependências
```bash
docker compose exec api cp .env.example .env
docker compose exec api composer install
docker compose exec api yarn install
```
### 4. Gere a chave da aplicação e configure o JWT
```bash
docker compose exec api php artisan key:generate
docker compose exec api php artisan jwt:secret
```

### 5. Execute as migrations e seeders
```bash
docker compose exec api php artisan migrate
docker compose exec api php artisan db:seed
```
# ✅ Testes automatizados com PHPUnit
Este projeto utiliza SQLite em memória para os testes.

### 1. Execute as migrations de teste
```bash
docker compose exec api php artisan migrate --env=testing
```

### 2. Rode os testes
```bash
docker compose exec api php artisan test
```

# 🐳 Estrutura Docker
 - api: Laravel backend
 - web: Frontend React (consome esta API)
 - mysql: Banco de dados
 - nginx: Servidor de aplicação com proxy reverso


# 🔗 Endpoints principais

| Método | Rota                         | Descrição                          |
|--------|------------------------------|------------------------------------|
| POST   | /api/login                   | Login do usuário                   |
| POST   | /api/register                | Registro de novo usuário           |
| GET    | /api/recipes                 | Listar receitas                    |
| POST   | /api/recipes                 | Criar nova receita                 |
| GET    | /api/recipes/{recipe}        | Detalhar receita específica        |
| PUT    | /api/recipes/{recipe}        | Atualizar receita                  |
| DELETE | /api/recipes/{recipe}        | Remover receita    
| GET    | /api/category                | Listar categorias                  |
| POST   | /api/category                | Criar nova categoria               |
| GET    | /api/category/{category}     | Detalhar categoria específica      |
| PUT    | /api/category/{category}     | Atualizar categoria                |
| DELETE | /api/category/{category}     | Remover categoria                  |
| GET    | /api/ingredients             | Listar ingredientes                |
| POST   | /api/ingredients             | Criar novo ingrediente             |
| GET    | /api/ingredients/{ingredient}| Detalhar ingrediente específico    |
| PUT    | /api/ingredients/{ingredient}| Atualizar ingrediente              |
| DELETE | /api/ingredients/{ingredient}| Remover ingrediente                |
| POST   | /api/logout                  | Logout do usuário                  |
| GET    | /api/me                      | Obter informações do usuário logado|

# 📌 Observações
- O frontend do projeto está localizado no diretório `frontend/` e sobe automaticamente junto com a API.
- As configurações de proxy reverso estão em `./nginx/`.
- Se o Composer falhar por qualquer motivo, rode novamente:
```bash 
docker compose exec api composer install
```




