const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '4rate'
});

connection.connect(err => {
    if (err) {
        console.log('Erro ao conectar no MySQL');
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = connection;
