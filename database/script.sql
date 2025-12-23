CREATE DATABASE IF NOT EXISTS `4rate`;
USE `4rate`;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS conteudos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    tipo VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    item_nome VARCHAR(255) NOT NULL,
    tipo ENUM('filme', 'musica', 'serie', 'jogo', 'outro') NOT NULL,
    nota INT NOT NULL,
    comentario TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- Nota: CHECK constraints on nota podem não ser aplicados em algumas versões do MySQL; validar no ambiente de produção


