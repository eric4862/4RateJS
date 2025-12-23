const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '4rate',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0
});

// tenta conectar de forma assíncrona para checar disponibilidade, sem lançar exceções não tratadas
pool.promise().getConnection()
    .then(connection => {
        console.log('Conectado ao MySQL (pool)');
        connection.release();
    })
    .catch(err => {
        console.error('Erro ao conectar no MySQL', err);
    });

module.exports = pool;
