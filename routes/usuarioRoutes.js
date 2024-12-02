const express = require('express');
const { cadastrar, login, editarSenha, editarNome, editarEmail, selecionarUsuario, selecionarTodosUsuarios, desativarUsuario, ativarUsuario } = require('../controllers/usuarioController');
//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * /usuario/cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário já existente
 */

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Email ou senha incorretos
 */

/**
 * @swagger
 * /usuario/editarSenha:
 *   put:
 *     summary: Edita a senha de um usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senhaNova:
 *                 type: string
 *                 description: Nova senha
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Email não encontrado ou erro no banco
 */

/**
 * @swagger
 * /usuario/editarNome:
 *   put:
 *     summary: Edita o nome de um usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               nome:
 *                 type: string
 *                 description: Novo nome do usuário
 *     responses:
 *       200:
 *         description: Nome alterado com sucesso
 *       400:
 *         description: Email não encontrado ou erro no banco
 */

/**
 * @swagger
 * /usuario/selecionarUsuario:
 *   get:
 *     summary: Retorna os dados de um usuário pelo ID
 *     tags: [Usuário]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       400:
 *         description: Usuário não encontrado ou erro no banco
 */

/**
 * @swagger
 * /usuario/selecionarUsuarios:
 *   get:
 *     summary: Retorna a lista de todos os usuários ativos
 *     tags: [Usuário]
 *     responses:
 *       200:
 *         description: Lista de usuários ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                     description: ID do usuário
 *                   email:
 *                     type: string
 *                     description: Email do usuário
 *                   nome:
 *                     type: string
 *                     description: Nome do usuário
 *       400:
 *         description: Não há usuários registrados ou erro no banco
 */

router.post('/cadastro', cadastrar);
router.post('/login', login);
router.put('/editarSenha', editarSenha);
router.put('/editarNome', editarNome);
router.put('/editarEmail', editarEmail);
router.get('/selecionarUsuario', selecionarUsuario);
router.get('/selecionarUsuarios', selecionarTodosUsuarios);
router.put('/desativarUsuario', desativarUsuario);
router.put('/ativarUsuario', ativarUsuario);


module.exports = router;
