const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  // Host do banco de dados
    user: 'root',  // Usuário do banco de dados
    password: '',  // Senha do banco de dados
    database: 'cmtu',  // Nome do banco de dados
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão ao MySQL bem-sucedida!');
});

module.exports = db;