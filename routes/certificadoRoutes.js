const express = require('express');
const { cadastrar, editarCertificado, desativarCertificado, ativarCertificado, selecionarCertificados } = require("../controllers/certificadoController");
const router = express.Router();
/**
 * @swagger
 * /certificado/cadastro:
 *   post:
 *     summary: Cadastra um novo certificado
 *     tags: [Certificado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataConclusao:
 *                 type: string
 *                 description: Data de conclusão no formato DD/MM/YYYY
 *               horas:
 *                 type: integer
 *                 description: Quantidade de horas
 *               idUsuario:
 *                 type: integer
 *                 description: ID do usuário associado
 *     responses:
 *       200:
 *         description: Certificado cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou erro no banco
 */

/**
 * @swagger
 * /certificado/editarCertificado:
 *   put:
 *     summary: Edita um certificado existente
 *     tags: [Certificado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do certificado a ser editado
 *               dataConclusao:
 *                 type: string
 *                 description: Nova data de conclusão no formato DD/MM/YYYY
 *               horas:
 *                 type: integer
 *                 description: Nova quantidade de horas
 *     responses:
 *       200:
 *         description: Certificado editado com sucesso
 *       400:
 *         description: Certificado não encontrado ou erro no banco
 */

/**
 * @swagger
 * /certificado/desativarCertificado:
 *   put:
 *     summary: Desativa um certificado
 *     tags: [Certificado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do certificado a ser desativado
 *     responses:
 *       200:
 *         description: Certificado desativado com sucesso
 *       400:
 *         description: Certificado não encontrado ou erro no banco
 */

/**
 * @swagger
 * /certificado/ativarCertificado:
 *   put:
 *     summary: Ativa um certificado desativado
 *     tags: [Certificado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do certificado a ser ativado
 *     responses:
 *       200:
 *         description: Certificado ativado com sucesso
 *       400:
 *         description: Certificado não encontrado ou erro no banco
 */

/**
 * @swagger
 * /certificado/selecionarCertificados:
 *   get:
 *     summary: Lista todos os certificados ativos
 *     tags: [Certificado]
 *     responses:
 *       200:
 *         description: Lista de certificados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_certificado:
 *                     type: integer
 *                     description: ID do certificado
 *                   data_conclusao:
 *                     type: string
 *                     description: Data de conclusão do certificado
 *                   horas:
 *                     type: integer
 *                     description: Quantidade de horas do certificado
 *                   id_usuario:
 *                     type: integer
 *                     description: ID do usuário associado ao certificado
 *       400:
 *         description: Não há certificados registrados ou erro no banco
 */

router.post('/cadastro', cadastrar);
router.put('/editarCertificado', editarCertificado);
router.put('/desativarCertificado', desativarCertificado);
router.put("/ativarCertificado", ativarCertificado);
router.get("/selecionarCertificados", selecionarCertificados)

module.exports = router;
