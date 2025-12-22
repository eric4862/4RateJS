CREATE DATABASE 4rate;
USE 4rate;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE conteudos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    tipo VARCHAR(20)
);

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nota INT,
    comentario TEXT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_conteudo INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_conteudo) REFERENCES conteudos(id)
);
