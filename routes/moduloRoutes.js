const express = require('express');
const { cadastrar, editarNome, selecionarTodosModulos, desativarModulo, ativarModulo } = require('../controllers/moduloController');

//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/cadastro', cadastrar);
router.put('/editarNome', editarNome);
router.put("/desativarModulo", desativarModulo);
router.put("/ativarModulo", ativarModulo);
router.get('/selecionarModulos', selecionarTodosModulos);


module.exports = router;
