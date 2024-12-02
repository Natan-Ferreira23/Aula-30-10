const express = require('express');
const { cadastrar, editarNome, selecionarTodosModulos, desativarModulo, ativarModulo } = require('../controllers/moduloController');

//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * /modulo/cadastro:
 *   post:
 *     summary: Cadastra um novo módulo
 *     tags: [Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do módulo
 *               porcentagem:
 *                 type: number
 *                 description: Porcentagem necessária para aprovação
 *     responses:
 *       200:
 *         description: Módulo cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou erro no banco
 */

/**
 * @swagger
 * /modulo/editarNome:
 *   put:
 *     summary: Edita o nome de um módulo
 *     tags: [Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do módulo a ser editado
 *               nome:
 *                 type: string
 *                 description: Novo nome para o módulo
 *     responses:
 *       200:
 *         description: Nome do módulo alterado com sucesso
 *       400:
 *         description: Módulo não encontrado ou erro no banco
 */

/**
 * @swagger
 * /modulo/desativarModulo:
 *   put:
 *     summary: Desativa um módulo
 *     tags: [Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do módulo a ser desativado
 *     responses:
 *       200:
 *         description: Módulo desativado com sucesso
 *       400:
 *         description: Módulo não encontrado ou erro no banco
 */

/**
 * @swagger
 * /modulo/ativarModulo:
 *   put:
 *     summary: Ativa um módulo desativado
 *     tags: [Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do módulo a ser ativado
 *     responses:
 *       200:
 *         description: Módulo ativado com sucesso
 *       400:
 *         description: Módulo não encontrado ou erro no banco
 */

/**
 * @swagger
 * /modulo/selecionarModulos:
 *   get:
 *     summary: Lista todos os módulos ativos
 *     tags: [Módulo]
 *     responses:
 *       200:
 *         description: Lista de módulos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_modulo:
 *                     type: integer
 *                     description: ID do módulo
 *                   nome_modulo:
 *                     type: string
 *                     description: Nome do módulo
 *                   porcentagem_necessaria:
 *                     type: number
 *                     description: Porcentagem necessária para aprovação
 *       400:
 *         description: Não há módulos registrados ou erro no banco
 */


router.post('/cadastro', cadastrar);
router.put('/editarNome', editarNome);
router.put("/desativarModulo", desativarModulo);
router.put("/ativarModulo", ativarModulo);
router.get('/selecionarModulos', selecionarTodosModulos);


module.exports = router;
