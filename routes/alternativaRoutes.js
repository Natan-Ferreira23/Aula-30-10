const express = require('express');
const { cadastrar, editarAlternativa, desativarAlternativa, ativarAlternativa, selecionarAlternativas } = require("../controllers/alternativaController");
const router = express.Router();
/**
 * @swagger
 * /alternativa/cadastro:
 *   post:
 *     summary: Cadastrar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Alternativa cadastrada com sucesso
 */

/**
 * @swagger
 * /alternativa/selecionarAlternativas:
 *   get:
 *     summary: Selecionar todas as alternativas
 *     tags: [Alternativa]
 *     responses:
 *       200:
 *         description: Lista de alternativas
 */

router.post('/cadastro', cadastrar);
router.put('/editarAlternativa', editarAlternativa);
router.put('/desativarAlternativa', desativarAlternativa);
router.put('/ativarAlternativa', ativarAlternativa);
router.get('/selecionarAlternativas', selecionarAlternativas);

module.exports = router;