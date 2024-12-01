const express = require('express');
const { cadastrar, login, editarSenha, editarNomeEmail, selecionarUsuario, selecionarTodosUsuarios, desativarUsuario, ativarUsuario, mudarAdmin } = require('../controllers/usuarioController');
//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /usuario/cadastro:
 *   post:
 *     summary: Cadastrar um novo usuário
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
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar o usuário
 */

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Fazer login do usuário
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
 *                 example: "joao.silva@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /usuario/editarSenha:
 *   put:
 *     summary: Editar senha do usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senhaAtual:
 *                 type: string
 *                 example: "senha123"
 *               novaSenha:
 *                 type: string
 *                 example: "novaSenha456"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar a senha
 */

/**
 * @swagger
 * /usuario/editarNome:
 *   put:
 *     summary: Editar nome do usuário
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
 *                 example: "João da Silva"
 *     responses:
 *       200:
 *         description: Nome atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o nome
 */

/**
 * @swagger
 * /usuario/editarEmail:
 *   put:
 *     summary: Editar e-mail do usuário
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
 *                 example: "joao.novoemail@gmail.com"
 *     responses:
 *       200:
 *         description: E-mail atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o e-mail
 */

/**
 * @swagger
 * /usuario/selecionarUsuario:
 *   get:
 *     summary: Selecionar um usuário pelo ID
 *     tags: [Usuário]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser selecionado
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@gmail.com"
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /usuario/selecionarUsuarios:
 *   get:
 *     summary: Selecionar todos os usuários
 *     tags: [Usuário]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários cadastrados
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
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     example: "joao.silva@gmail.com"
 *                   status:
 *                     type: string
 *                     example: "ativo"
 */

/**
 * @swagger
 * /usuario/desativarUsuario:
 *   put:
 *     summary: Desativar um usuário
 *     tags: [Usuário]
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
 *         description: Usuário desativado com sucesso
 *       400:
 *         description: Erro ao desativar o usuário
 */

/**
 * @swagger
 * /usuario/ativarUsuario:
 *   put:
 *     summary: Ativar um usuário
 *     tags: [Usuário]
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
 *         description: Usuário ativado com sucesso
 *       400:
 *         description: Erro ao ativar o usuário
 */

router.post('/cadastro', cadastrar);
router.post('/login', login);
router.post('/editarNomeEmail', editarNomeEmail);
router.put('/editarSenha', editarSenha);
router.get('/selecionarUsuario', selecionarUsuario);
router.get('/selecionarUsuarios', selecionarTodosUsuarios);
router.put('/desativarUsuario', desativarUsuario);
router.put('/ativarUsuario', ativarUsuario);
router.post('/mudarAdmin', mudarAdmin);

module.exports = router;