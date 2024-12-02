const express = require('express');
const { cadastrar, editarUsuarioModulo, selecionarUsuarioModulo, iniciarModulo } = require('../controllers/usuario_moduloController');
//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * /usuarioModulo/cadastro:
 *   post:
 *     summary: Cadastra um novo vínculo entre usuário e módulo
 *     tags: [Usuário-Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               porcentagemConcluido:
 *                 type: number
 *                 description: Porcentagem concluída no módulo
 *               idModulo:
 *                 type: integer
 *                 description: ID do módulo
 *               idUsuario:
 *                 type: integer
 *                 description: ID do usuário
 *     responses:
 *       200:
 *         description: Vínculo criado com sucesso
 *       400:
 *         description: Dados inválidos ou erro no banco
 */

/**
 * @swagger
 * /usuarioModulo/editarUsuarioModulo:
 *   put:
 *     summary: Edita os dados de um vínculo entre usuário e módulo
 *     tags: [Usuário-Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do vínculo a ser editado
 *               porcentagemConcluido:
 *                 type: number
 *                 description: Nova porcentagem concluída
 *               idModulo:
 *                 type: integer
 *                 description: Novo ID do módulo
 *               idUsuario:
 *                 type: integer
 *                 description: Novo ID do usuário
 *     responses:
 *       200:
 *         description: Vínculo editado com sucesso
 *       400:
 *         description: Vínculo não encontrado ou erro no banco
 */

/**
 * @swagger
 * /usuarioModulo/selecionarUsuariosModulos:
 *   get:
 *     summary: Lista todos os vínculos entre usuários e módulos
 *     tags: [Usuário-Módulo]
 *     responses:
 *       200:
 *         description: Lista de vínculos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario_modulo:
 *                     type: integer
 *                     description: ID do vínculo
 *                   porcentagem_concluido:
 *                     type: number
 *                     description: Porcentagem concluída
 *                   id_modulo:
 *                     type: integer
 *                     description: ID do módulo
 *                   id_usuario:
 *                     type: integer
 *                     description: ID do usuário
 *       400:
 *         description: Não há vínculos registrados ou erro no banco
 */

/**
 * @swagger
 * /usuarioModulo/iniciarModulo:
 *   put:
 *     summary: Marca o início de um módulo para um usuário
 *     tags: [Usuário-Módulo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do vínculo a ser iniciado
 *     responses:
 *       200:
 *         description: Módulo iniciado com sucesso
 *       400:
 *         description: Vínculo não encontrado ou erro no banco
 */

router.post('/cadastro', cadastrar);
router.put("/editarUsuarioModulo", editarUsuarioModulo);
router.get("/selecionarUsuariosModulos", selecionarUsuarioModulo);
router.put("/iniciarModulo", iniciarModulo);



module.exports = router;

