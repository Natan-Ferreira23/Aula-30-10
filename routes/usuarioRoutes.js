const express = require('express');
const { cadastrar, login, editarSenha, editarNome, desativarUsuario, ativarUsuario, home } = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/cadastro', cadastrar);
router.post('/login', login);
router.put('/editaSenha', verificarToken, editarSenha);
router.put('/editaNome', verificarToken, editarNome);
router.put('/desativaUsuario', verificarToken, desativarUsuario);
router.put('/ativaUsuario', verificarToken, ativarUsuario);
router.get('/home', verificarToken, home);

module.exports = router;
