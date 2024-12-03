const express = require('express');
const { cadastrar, cadastrarComDataConclusao, editarCertificado, desativarCertificado, ativarCertificado, selecionarCertificados, selecionarCertificadosComUsuario } = require("../controllers/certificadoController");
const router = express.Router();


/**
 * @swagger
 * /certificado/cadastro:
 *   post:
 *     summary: Cadastrar um certificado
 *     tags: [Certificado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Certificado de Conclusão"
 *               descricao:
 *                 type: string
 *                 example: "Certificado para quem concluiu o curso"
 *     responses:
 *       201:
 *         description: Certificado cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar o certificado
 */

/**
 * @swagger
 * /certificado/editarCertificado:
 *   put:
 *     summary: Editar um certificado existente
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
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 example: "Certificado Atualizado"
 *               descricao:
 *                 type: string
 *                 example: "Descrição atualizada do certificado"
 *     responses:
 *       200:
 *         description: Certificado editado com sucesso
 *       400:
 *         description: Erro ao editar o certificado
 */

/**
 * @swagger
 * /certificado/desativarCertificado:
 *   put:
 *     summary: Desativar um certificado
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Certificado desativado com sucesso
 *       400:
 *         description: Erro ao desativar o certificado
 */

/**
 * @swagger
 * /certificado/ativarCertificado:
 *   put:
 *     summary: Ativar um certificado
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Certificado ativado com sucesso
 *       400:
 *         description: Erro ao ativar o certificado
 */

/**
 * @swagger
 * /certificado/selecionarCertificados:
 *   get:
 *     summary: Selecionar todos os certificados
 *     tags: [Certificado]
 *     responses:
 *       200:
 *         description: Lista de certificados disponíveis
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
 *                     example: "Certificado de Excelência"
 *                   descricao:
 *                     type: string
 *                     example: "Descrição do certificado de excelência"
 *                   status:
 *                     type: string
 *                     example: "ativo"
 *       400:
 *         description: Erro ao buscar certificados
 */

router.post('/cadastro', cadastrar);
router.post('/cadastro', cadastrarComDataConclusao);
router.put('/editarCertificado', editarCertificado);
router.put('/desativarCertificado', desativarCertificado);
router.put("/ativarCertificado", ativarCertificado);
router.get("/selecionarCertificados", selecionarCertificados)
router.get("/selecionarCertificadosComUsuario", selecionarCertificadosComUsuario)

module.exports = router;