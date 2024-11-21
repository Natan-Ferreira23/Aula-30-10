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
 *                 example: "Nova alternativa"
 *     responses:
 *       201:
 *         description: Alternativa cadastrada com sucesso
 *       400:
 *         description: Erro ao cadastrar alternativa
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   descricao:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [ativo, inativo]
 *       500:
 *         description: Erro ao buscar alternativas
 */

/**
 * @swagger
 * /alternativa/editarAlternativa:
 *   put:
 *     summary: Editar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               descricao:
 *                 type: string
 *                 example: "Alternativa atualizada"
 *     responses:
 *       200:
 *         description: Alternativa editada com sucesso
 *       400:
 *         description: Erro ao editar alternativa
 */

/**
 * @swagger
 * /alternativa/desativarAlternativa:
 *   put:
 *     summary: Desativar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Alternativa desativada com sucesso
 *       400:
 *         description: Erro ao desativar alternativa
 */

/**
 * @swagger
 * /alternativa/ativarAlternativa:
 *   put:
 *     summary: Ativar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Alternativa ativada com sucesso
 *       400:
 *         description: Erro ao ativar alternativa
 */

router.post('/cadastro', cadastrar);
router.put('/editarAlternativa', editarAlternativa);
router.put('/desativarAlternativa', desativarAlternativa);
router.put('/ativarAlternativa', ativarAlternativa);
router.get('/selecionarAlternativas', selecionarAlternativas);

module.exports = router;