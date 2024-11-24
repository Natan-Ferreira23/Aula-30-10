const express = require('express');
const { cadastrar, editarAtividade, desativarAtividade, ativarAtividade, selecionarAtividades, selecionarAtividade, acertar, errar } = require("../controllers/atividadeController");
const router = express.Router();

/**
 * @swagger
 * /atividade/cadastro:
 *   post:
 *     summary: Cadastrar atividade
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nova Atividade"
 *               descricao:
 *                 type: string
 *                 example: "Descrição da nova atividade"
 *     responses:
 *       201:
 *         description: Atividade cadastrada com sucesso
 *       400:
 *         description: Erro ao cadastrar a atividade
 */

/**
 * @swagger
 * /atividade/editarAtividade:
 *   put:
 *     summary: Editar uma atividade existente
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
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 example: "Atividade Editada"
 *               descricao:
 *                 type: string
 *                 example: "Descrição atualizada da atividade"
 *     responses:
 *       200:
 *         description: Atividade editada com sucesso
 *       400:
 *         description: Erro ao editar a atividade
 */

/**
 * @swagger
 * /atividade/desativarAtividade:
 *   put:
 *     summary: Desativar uma atividade
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Atividade desativada com sucesso
 *       400:
 *         description: Erro ao desativar a atividade
 */

/**
 * @swagger
 * /atividade/ativarAtividade:
 *   put:
 *     summary: Ativar uma atividade
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Atividade ativada com sucesso
 *       400:
 *         description: Erro ao ativar a atividade
 */

/**
 * @swagger
 * /atividade/selecionarAtividades:
 *   get:
 *     summary: Selecionar todas as atividades
 *     tags: [Atividade]
 *     responses:
 *       200:
 *         description: Lista de atividades disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Título da Atividade"
 *                   descricao:
 *                     type: string
 *                     example: "Descrição da Atividade"
 *                   status:
 *                     type: string
 *                     example: "ativo"
 */

/**
 * @swagger
 * /atividade/acertar:
 *   post:
 *     summary: Registrar um acerto na atividade
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
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Acerto registrado com sucesso
 *       400:
 *         description: Erro ao registrar o acerto
 */

/**
 * @swagger
 * /atividade/errar:
 *   post:
 *     summary: Registrar um erro na atividade
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
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Erro registrado com sucesso
 *       400:
 *         description: Erro ao registrar o erro
 */

router.post('/cadastro', cadastrar);
router.put('/editarAtividade', editarAtividade);
router.put('/desativarAtividade', desativarAtividade);
router.put('/ativarAtividade', ativarAtividade);
router.get('/selecionarAtividades', selecionarAtividades);
router.get('/selecionarAtividade', selecionarAtividade);
router.post('/acertar', acertar);
router.post('/errar', errar);
module.exports = router;