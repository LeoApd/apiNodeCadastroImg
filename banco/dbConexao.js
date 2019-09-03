const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin123',
    database: 'db_galeria'
});

module.exports = conexao;