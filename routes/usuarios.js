const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// cadastro
router.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    });
});

// login com JWT
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const usuario = results[0];

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        res.json({
            mensagem: 'Login realizado com sucesso',
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    });
});


// listar usuários
router.get('/', (req, res) => {
    const sql = 'SELECT id, nome, email FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }
        res.json(results);
    });
});

module.exports = router;
