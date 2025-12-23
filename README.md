# 4RateJS

## ⚙️ Requisitos

- Node.js (>=16)
- MySQL rodando localmente (porta 3306) e um banco `4rate` criado com o script em `database/script.sql`

## 🔐 Variáveis de ambiente

- `JWT_SECRET` — segredo usado para assinar tokens JWT. Se não informado, o projeto usa um fallback `segredo` (apenas para desenvolvimento).
- `PORT` — porta onde o servidor escuta (padrão: `3000`).
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — configurações para conexão com MySQL (padrões: `localhost`, `root`, ``, `4rate`).
- `DB_CONNECTION_LIMIT`, `DB_QUEUE_LIMIT` — limites de conexão do pool (padrões: `10`, `0`).

Observação: se o MySQL estiver indisponível, endpoints que dependem do banco retornam 503 com a mensagem `Serviço de banco indisponível`.

Health endpoint:
- `GET /health` — retorna 200 com `{ ok: true, db: "ok" }` se o servidor e o DB estiverem operacionais; retorna 503 com `{ ok: false, db: "unavailable" }` se o DB estiver inacessível.

## Usando Docker (desenvolvimento)

1. Copie o exemplo de `env` e ajuste se necessário:

```bash
cp .env.example .env
# edite .env para ajustar senhas/porta se necessário
```

2. Suba o MySQL com Docker Compose (o script SQL será importado automaticamente na primeira inicialização):

```bash
docker compose up -d
```

3. Verifique logs/health:

```bash
docker logs -f 4rate-db
curl -i http://localhost:3000/health
```

4. Para reiniciar e recriar volume (apenas se precisar resetar o banco):

```bash
docker rm -f 4rate-db || true
docker volume rm 4ratejs_db_data || true
docker compose up -d
```

## 🔧 Observações

- O projeto usa `bcryptjs` para hashing de senhas. `bcrypt` foi removido das dependências para evitar ambiguidade.
- Para iniciar: `npm install` (se necessário) e `npm start`.
