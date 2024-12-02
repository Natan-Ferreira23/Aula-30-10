const express = require('express');
const { perguntasErradas, perguntasCertas, pessoasCertificado, quantidadeCertificado, mediaNotas, totalModulos, moduloIniciado } = require("../controllers/apiDadosController");
const router = express.Router();
/**
 * @swagger
 * /apiDados/perguntasErradas:
 *   get:
 *     summary: Retorna as 5 perguntas mais erradas
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Lista das 5 perguntas mais erradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   texto:
 *                     type: string
 *                     description: Texto da pergunta
 *                   erro:
 *                     type: integer
 *                     description: Número de erros
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

/**
 * @swagger
 * /apiDados/perguntasCertas:
 *   get:
 *     summary: Retorna as 5 perguntas mais acertadas
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Lista das 5 perguntas mais acertadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   texto:
 *                     type: string
 *                     description: Texto da pergunta
 *                   acerto:
 *                     type: integer
 *                     description: Número de acertos
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

/**
 * @swagger
 * /apiDados/pessoasCertificado:
 *   get:
 *     summary: Retorna a quantidade de pessoas com certificado
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Quantidade de pessoas com certificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Quantidade_de_usuarios:
 *                   type: integer
 *                   description: Quantidade de pessoas com certificado
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

/**
 * @swagger
 * /apiDados/quantidadeCertificado:
 *   get:
 *     summary: Retorna a quantidade total de certificados emitidos
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Quantidade de certificados emitidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Quantidade_de_certificados:
 *                   type: integer
 *                   description: Total de certificados emitidos
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

/**
 * @swagger
 * /apiDados/mediaNotas:
 *   get:
 *     summary: Retorna a média das porcentagens concluídas
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Lista de porcentagens concluídas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   PORCENTAGEM_CONCLUIDO:
 *                     type: number
 *                     description: Porcentagem de conclusão
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

/**
 * @swagger
 * /apiDados/moduloIniciado:
 *   get:
 *     summary: Retorna a quantidade de módulos iniciados
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Quantidade de módulos iniciados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Iniciado_modulos:
 *                   type: integer
 *                   description: Quantidade de módulos iniciados
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

/**
 * @swagger
 * /apiDados/totalModulos:
 *   get:
 *     summary: Retorna o total de módulos ativos
 *     tags: [API Dados]
 *     responses:
 *       200:
 *         description: Total de módulos ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Total_modulos:
 *                   type: integer
 *                   description: Quantidade total de módulos
 *       400:
 *         description: Erro ao consultar o banco ou dados ausentes
 */

router.get('/perguntasErradas', perguntasErradas); //top 5 perguntas erradas;
router.get('/perguntasCertas', perguntasCertas); // top 5 perguntas certas;
router.get('/pessoasCertificado', pessoasCertificado); // pessoas com certificado
router.get('/quantidadeCertificado', quantidadeCertificado); // quantidade de certificados no banco
router.get('/mediaNotas', mediaNotas); //media de notas
router.get('/totalModulos', totalModulos); //total modulos;
router.get('/moduloIniciado', moduloIniciado); //modulos iniciados


module.exports = router;
