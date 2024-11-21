const express = require('express');
const { cadastrar, editarUsuarioModulo, selecionarUsuarioModulo, iniciarModulo } = require('../controllers/usuario_moduloController');
//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /usuarioModulo/cadastro:
 *   post:
 *     summary: Cadastrar um novo vínculo entre usuário e módulo
 *     tags: [Usuário Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 101
 *               moduloId:
 *                 type: integer
 *                 example: 202
 *     responses:
 *       201:
 *         description: Vínculo entre usuário e módulo cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar o vínculo
 */

/**
 * @swagger
 * /usuarioModulo/editarUsuarioModulo:
 *   put:
 *     summary: Editar informações do vínculo entre usuário e módulo
 *     tags: [Usuário Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 101
 *               moduloId:
 *                 type: integer
 *                 example: 202
 *               progresso:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Informações do vínculo atualizadas com sucesso
 *       400:
 *         description: Erro ao atualizar as informações
 */

/**
 * @swagger
 * /usuarioModulo/selecionarUsuariosModulos:
 *   get:
 *     summary: Selecionar todos os vínculos entre usuários e módulos
 *     tags: [Usuário Módulo]
 *     responses:
 *       200:
 *         description: Lista de vínculos entre usuários e módulos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuarioId:
 *                     type: integer
 *                     example: 101
 *                   moduloId:
 *                     type: integer
 *                     example: 202
 *                   progresso:
 *                     type: integer
 *                     example: 75
 *                   status:
 *                     type: string
 *                     example: "ativo"
 *       400:
 *         description: Erro ao buscar os vínculos
 */

/**
 * @swagger
 * /usuarioModulo/iniciarModulo:
 *   put:
 *     summary: Iniciar um módulo para um usuário
 *     tags: [Usuário Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 101
 *               moduloId:
 *                 type: integer
 *                 example: 202
 *     responses:
 *       200:
 *         description: Módulo iniciado com sucesso
 *       400:
 *         description: Erro ao iniciar o módulo
 */

router.post('/cadastro', cadastrar);
router.put("/editarUsuarioModulo", editarUsuarioModulo);
router.get("/selecionarUsuariosModulos", selecionarUsuarioModulo);
router.put("/iniciarModulo", iniciarModulo);



module.exports = router;
