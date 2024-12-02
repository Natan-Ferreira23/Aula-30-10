const express = require('express');
const { cadastrar, editarAlternativa, desativarAlternativa, ativarAlternativa, selecionarAlternativas } = require("../controllers/alternativaController");
const router = express.Router();
/**
 * @swagger
 * /alternativa/cadastro:
 *   post:
 *     summary: Cadastra uma nova alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Texto da alternativa
 *               idAtividade:
 *                 type: integer
 *                 description: ID da atividade associada
 *     responses:
 *       200:
 *         description: Alternativa cadastrada com sucesso
 *       400:
 *         description: Dados inválidos ou erro no banco
 */

/**
 * @swagger
 * /alternativa/editarAlternativa:
 *   put:
 *     summary: Edita uma alternativa existente
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAlternativa:
 *                 type: integer
 *                 description: ID da alternativa a ser editada
 *               texto:
 *                 type: string
 *                 description: Novo texto para a alternativa
 *     responses:
 *       200:
 *         description: Alternativa editada com sucesso
 *       400:
 *         description: Alternativa não encontrada ou erro no banco
 */

/**
 * @swagger
 * /alternativa/desativarAlternativa:
 *   put:
 *     summary: Desativa uma alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAlternativa:
 *                 type: integer
 *                 description: ID da alternativa a ser desativada
 *     responses:
 *       200:
 *         description: Alternativa desativada com sucesso
 *       400:
 *         description: Alternativa não encontrada ou erro no banco
 */

/**
 * @swagger
 * /alternativa/ativarAlternativa:
 *   put:
 *     summary: Ativa uma alternativa desativada
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAlternativa:
 *                 type: integer
 *                 description: ID da alternativa a ser ativada
 *     responses:
 *       200:
 *         description: Alternativa ativada com sucesso
 *       400:
 *         description: Alternativa não encontrada ou erro no banco
 */

/**
 * @swagger
 * /alternativa/selecionarAlternativas:
 *   get:
 *     summary: Lista todas as alternativas ativas
 *     tags: [Alternativa]
 *     responses:
 *       200:
 *         description: Lista de alternativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_alternativa:
 *                     type: integer
 *                     description: ID da alternativa
 *                   texto:
 *                     type: string
 *                     description: Texto da alternativa
 *       400:
 *         description: Não há alternativas registradas ou erro no banco
 */

router.post('/cadastro', cadastrar);
router.put('/editarAlternativa', editarAlternativa);
router.put('/desativarAlternativa', desativarAlternativa);
router.put('/ativarAlternativa', ativarAlternativa);
router.get('/selecionarAlternativas', selecionarAlternativas);

module.exports = router;
