const express = require('express');
const { cadastrar, editarAlternativa, desativarAlternativa, ativarAlternativa, selecionarAlternativas } = require("../controllers/alternativaController");
const router = express.Router();
router.post('/cadastro', cadastrar);
router.put('/editarAlternativa', editarAlternativa);
router.put('/desativarAlternativa', desativarAlternativa);
router.put('/ativarAlternativa', ativarAlternativa);
router.get('/selecionarAlternativas', selecionarAlternativas);

module.exports = router;