
const express = require('express');
//const db = require('./database/db'); // Configuração do banco de dados

const usuarioRoutes = require('./routes/usuarioRoutes');
const moduloRoutes = require('./routes/moduloRoutes');
const atividadeRoutes = require('./routes/ativadeRoutes');
const alternativaRoutes = require('./routes/alternativaRoutes');
const certificadoRoutes = require('./routes/certificadoRoutes');
const usuario_moduloRoutes = require('./routes/usuario_moduloRoutes');
const app = express();
const porta = 8079;

app.use(express.json());
app.use('/usuario', usuarioRoutes); // Prefixo para as rotas
app.use('/modulo', moduloRoutes);
app.use('/atividade', atividadeRoutes);
app.use('/alternativa', alternativaRoutes);
app.use('/certificado', certificadoRoutes);
app.use('/usuarioModulo', usuario_moduloRoutes);
app.listen(porta, () => {
    console.log("SERVIDOR RODANDO NA PORTA " + porta);
});
