const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const jwtConfig = require("../config/jwt");

const router = express.Router();

function isDbUnavailable(err) {
  if (!err) return false;
  if (err.code === 'ECONNREFUSED') return true;
  if (err.message && err.message.includes('ECONNREFUSED')) return true;
  if (Array.isArray(err.errors)) {
    return err.errors.some(e => e && (e.code === 'ECONNREFUSED' || (e.message && e.message.includes('ECONNREFUSED'))));
  }
  if (Array.isArray(err) && err.length > 0) {
    return err.some(e => e && (e.code === 'ECONNREFUSED' || (e.message && e.message.includes('ECONNREFUSED'))));
  }
  return false;
}

// 📌 CADASTRO
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  try {
    // verifica se email já existe
    const [rows] = await db.promise().query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ erro: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    await db.promise().query(sql, [nome, email, hash]);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error(err);
    if (isDbUnavailable(err)) {
      return res.status(503).json({ erro: "Serviço de banco indisponível" });
    }
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
});

// 📌 LOGIN
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha email e senha" });
  }

  try {
    const [results] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      jwtConfig.secret,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    if (isDbUnavailable(err)) {
      return res.status(503).json({ erro: "Serviço de banco indisponível" });
    }
    res.status(500).json({ erro: "Erro ao consultar usuário" });
  }
});

module.exports = router;
