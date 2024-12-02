
const express = require('express');
const db = require('./database/db');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const moduloRoutes = require('./routes/moduloRoutes');
const atividadeRoutes = require('./routes/ativadeRoutes');
const alternativaRoutes = require('./routes/alternativaRoutes');
const certificadoRoutes = require('./routes/certificadoRoutes');
const usuario_moduloRoutes = require('./routes/usuario_moduloRoutes');
const apiDadosRoutes = require('./routes/apiDadosRoutes');
const app = express();

const swaggerSetup = require('./swagger');

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/usuario', usuarioRoutes);
app.use('/modulo', moduloRoutes);
app.use('/atividade', atividadeRoutes);
app.use('/alternativa', alternativaRoutes);
app.use('/certificado', certificadoRoutes);
app.use('/usuarioModulo', usuario_moduloRoutes);
app.use('/apiDados', apiDadosRoutes);

swaggerSetup(app);

app.listen(PORT, () => {
    console.log("SERVIDOR RODANDO NA PORTA " + PORT);
});
