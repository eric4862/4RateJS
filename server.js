require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const usuariosRoutes = require("./routes/usuarios");
const avaliacoesRoutes = require("./routes/avaliacoes");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

// serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "frontend")));

// rota raiz que abre o feed
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "feed.html"));
});

// health check — verifica DB e servidor
app.get("/health", async (req, res) => {
    try {
        await db.promise().query("SELECT 1");
        return res.json({ ok: true, db: "ok" });
    } catch (err) {
        console.error("Health DB check failed:", err && err.code ? err.code : err);
        return res.status(503).json({ ok: false, db: "unavailable" });
    }
});

// rota de teste
app.get("/teste", (req, res) => {
    res.json({ ok: true });
});
// rotas
app.use("/usuarios", usuariosRoutes);
app.use("/avaliacoes", avaliacoesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
