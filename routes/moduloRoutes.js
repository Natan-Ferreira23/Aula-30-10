const express = require('express');
const { cadastrar, editarNome, editarModulo, selecionarTodosModulos, selecionarTodosModulosAtivados, desativarModulo, ativarModulo } = require('../controllers/moduloController');

//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /modulo/cadastro:
 *   post:
 *     summary: Cadastrar um novo módulo
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
 *                 example: "Módulo de Introdução"
 *               descricao:
 *                 type: string
 *                 example: "Este módulo cobre os conceitos básicos do curso"
 *     responses:
 *       201:
 *         description: Módulo cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar o módulo
 */

/**
 * @swagger
 * /modulo/editarNome:
 *   put:
 *     summary: Editar o nome de um módulo existente
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
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: "Módulo Avançado"
 *     responses:
 *       200:
 *         description: Nome do módulo editado com sucesso
 *       400:
 *         description: Erro ao editar o nome do módulo
 */

/**
 * @swagger
 * /modulo/desativarModulo:
 *   put:
 *     summary: Desativar um módulo
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Módulo desativado com sucesso
 *       400:
 *         description: Erro ao desativar o módulo
 */

/**
 * @swagger
 * /modulo/ativarModulo:
 *   put:
 *     summary: Ativar um módulo
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Módulo ativado com sucesso
 *       400:
 *         description: Erro ao ativar o módulo
 */

/**
 * @swagger
 * /modulo/selecionarModulos:
 *   get:
 *     summary: Selecionar todos os módulos
 *     tags: [Módulo]
 *     responses:
 *       200:
 *         description: Lista de todos os módulos cadastrados
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
 *                   nome:
 *                     type: string
 *                     example: "Módulo Básico"
 *                   descricao:
 *                     type: string
 *                     example: "Introdução aos conceitos básicos"
 *                   status:
 *                     type: string
 *                     example: "ativo"
 *       400:
 *         description: Erro ao buscar os módulos
 */

router.post('/cadastro', cadastrar);
router.put('/editarNome', editarNome);
router.post('/editarModulo', editarModulo);
router.put("/desativarModulo", desativarModulo);
router.put("/ativarModulo", ativarModulo);
router.get('/selecionarModulos', selecionarTodosModulos);
router.get('/selecionarTodosModulosAtivados', selecionarTodosModulosAtivados);


module.exports = router;
