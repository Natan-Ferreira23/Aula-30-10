const express = require('express');
const { cadastrar, login, editarSenha, editarNome, editarEmail, selecionarUsuario, selecionarTodosUsuarios, desativarUsuario, ativarUsuario } = require('../controllers/usuarioController');
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
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
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
 *               senha:
 *                 type: string
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
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar a senha
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
