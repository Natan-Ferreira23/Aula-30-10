const express = require('express');
const { cadastrar, editarAtividade, desativarAtividade, ativarAtividade, selecionarAtividades } = require("../controllers/atividadeController");
const router = express.Router();
router.post('/cadastro', cadastrar);
router.put('/editarAtividade', editarAtividade);
router.put('/desativarAtividade', desativarAtividade);
router.put('/ativarAtividade', ativarAtividade);
router.get('/selecionarAtividades', selecionarAtividades);
module.exports = router;