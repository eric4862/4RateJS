const express = require('express');
const router = express.Router();
const db = require('../db');
const authJwt = require('../middlewares/authJwt');

// criar avaliação (rota protegida com JWT)
router.post('/', authJwt, (req, res) => {
    const { nota, comentario, id_conteudo } = req.body;
    const id_usuario = req.usuarioId;

    const sql = `
        INSERT INTO avaliacoes (nota, comentario, id_usuario, id_conteudo)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nota, comentario, id_usuario, id_conteudo], (err) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }
        res.status(201).json({ mensagem: 'Avaliação criada com sucesso' });
    });
});


// listar avaliações (feed)
router.get('/', (req, res) => {
    const sql = `
        SELECT a.id, a.nota, a.comentario, a.data,
               u.nome AS usuario,
               c.titulo AS conteudo,
               c.tipo
        FROM avaliacoes a
        JOIN usuarios u ON a.id_usuario = u.id
        JOIN conteudos c ON a.id_conteudo = c.id
        ORDER BY a.data DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }
        res.json(results);
    });
});

module.exports = router;
