
const express = require('express');
//const db = require('./database/db'); // Configuração do banco de dados

const usuarioRoutes = require('./routes/usuarioRoutes');
const moduloRoutes = require('./routes/moduloRoutes');
const atividadeRoutes = require('./routes/ativadeRoutes');
const alternativaRoutes = require('./routes/alternativaRoutes');
const certificadoRoutes = require('./routes/certificadoRoutes');
const usuario_moduloRoutes = require('./routes/usuario_moduloRoutes');
const apiDadosRoutes = require('./routes/apiDadosRoutes');
const cors = require('cors'); // para utilizar a api

const swaggerConfig = require('./swagger');

const app = express();
const porta = 8079;
// Habilitar CORS para todas as rotas
app.use(cors());
app.use(express.json());
app.use('/usuario', usuarioRoutes); // Prefixo para as rotas
app.use('/modulo', moduloRoutes);
app.use('/atividade', atividadeRoutes);
app.use('/alternativa', alternativaRoutes);
app.use('/certificado', certificadoRoutes);
app.use('/usuarioModulo', usuario_moduloRoutes);
app.use('/apiDados', apiDadosRoutes);

swaggerConfig(app);

app.listen(porta, () => {
    console.log("SERVIDOR RODANDO NA PORTA " + porta);
});
