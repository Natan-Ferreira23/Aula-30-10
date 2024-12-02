const express = require('express');
const { cadastrar, editarAtividade, desativarAtividade, ativarAtividade, selecionarAtividades, acertar, errar } = require("../controllers/atividadeController");
const router = express.Router();
/**
 * @swagger
 * /atividade/cadastro:
 *   post:
 *     summary: Cadastra uma nova atividade
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respostaCerta:
 *                 type: string
 *                 description: Resposta correta da atividade
 *               nome:
 *                 type: string
 *                 description: Nome da atividade
 *               texto:
 *                 type: string
 *                 description: Texto da atividade
 *               idModulo:
 *                 type: integer
 *                 description: ID do módulo associado
 *     responses:
 *       200:
 *         description: Atividade cadastrada com sucesso
 *       400:
 *         description: Dados inválidos ou erro no banco
 */

/**
 * @swagger
 * /atividade/editarAtividade:
 *   put:
 *     summary: Edita uma atividade existente
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAtividade:
 *                 type: integer
 *                 description: ID da atividade a ser editada
 *               respostaCerta:
 *                 type: string
 *                 description: Nova resposta correta
 *               nome:
 *                 type: string
 *                 description: Novo nome da atividade
 *               texto:
 *                 type: string
 *                 description: Novo texto da atividade
 *               idModulo:
 *                 type: integer
 *                 description: Novo ID do módulo associado
 *     responses:
 *       200:
 *         description: Atividade editada com sucesso
 *       400:
 *         description: Atividade não encontrada ou erro no banco
 */

/**
 * @swagger
 * /atividade/desativarAtividade:
 *   put:
 *     summary: Desativa uma atividade
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAtividade:
 *                 type: integer
 *                 description: ID da atividade a ser desativada
 *     responses:
 *       200:
 *         description: Atividade desativada com sucesso
 *       400:
 *         description: Atividade não encontrada ou erro no banco
 */

/**
 * @swagger
 * /atividade/ativarAtividade:
 *   put:
 *     summary: Ativa uma atividade desativada
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAtividade:
 *                 type: integer
 *                 description: ID da atividade a ser ativada
 *     responses:
 *       200:
 *         description: Atividade ativada com sucesso
 *       400:
 *         description: Atividade não encontrada ou erro no banco
 */

/**
 * @swagger
 * /atividade/selecionarAtividades:
 *   get:
 *     summary: Lista todas as atividades ativas
 *     tags: [Atividade]
 *     responses:
 *       200:
 *         description: Lista de atividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_atividade:
 *                     type: integer
 *                     description: ID da atividade
 *                   nome:
 *                     type: string
 *                     description: Nome da atividade
 *                   texto:
 *                     type: string
 *                     description: Texto da atividade
 *       400:
 *         description: Não há atividades registradas ou erro no banco
 */

/**
 * @swagger
 * /atividade/acertar:
 *   post:
 *     summary: Marca uma atividade como acertada
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da atividade acertada
 *     responses:
 *       200:
 *         description: Acerto registrado com sucesso
 *       400:
 *         description: Atividade não encontrada ou erro no banco
 */

/**
 * @swagger
 * /atividade/errar:
 *   post:
 *     summary: Marca uma atividade como errada
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da atividade errada
 *     responses:
 *       200:
 *         description: Erro registrado com sucesso
 *       400:
 *         description: Atividade não encontrada ou erro no banco
 */

router.post('/cadastro', cadastrar);
router.put('/editarAtividade', editarAtividade);
router.put('/desativarAtividade', desativarAtividade);
router.put('/ativarAtividade', ativarAtividade);
router.get('/selecionarAtividades', selecionarAtividades);
router.post('/acertar', acertar);
router.post('/errar', errar);
module.exports = router;
