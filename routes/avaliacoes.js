const express = require("express");
const db = require("../db");
const authJwt = require("../middlewares/authJwt");

const router = express.Router();

// Criar nova avaliação
router.post("/", authJwt, (req, res) => {
    const { item_nome, tipo, nota, comentario } = req.body;

    if (!item_nome || !tipo || nota === undefined) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
    }

    const sql = `
        INSERT INTO avaliacoes (usuario_id, item_nome, tipo, nota, comentario)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [req.usuarioId, item_nome, tipo, nota, comentario || null],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ erro: "Erro ao criar avaliação" });
            }

            res.status(201).json({ mensagem: "Avaliação criada com sucesso" });
        }
    );
});

// Feed de avaliações
router.get("/", authJwt, (req, res) => {
    const sql = `
        SELECT 
            a.id,
            u.nome AS usuario,
            a.item_nome,
            a.tipo,
            a.nota,
            a.comentario,
            a.data_criacao
        FROM avaliacoes a
        JOIN usuarios u ON u.id = a.usuario_id
        ORDER BY a.data_criacao DESC
    `;

    db.query(sql, (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao buscar feed" });
        }

        res.json(resultados);
    });
});

module.exports = router;
