require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios");
const avaliacoesRoutes = require("./routes/avaliacoes");

const app = express();

app.use(cors());
app.use(express.json());

// rota de teste
app.get("/teste", (req, res) => {
    res.json({ ok: true });
});

// rotas
app.use("/usuarios", usuariosRoutes);
app.use("/avaliacoes", avaliacoesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
