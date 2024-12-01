const express = require('express');
const { perguntasErradas, perguntasCertas, pessoasCertificado, quantidadeCertificado, mediaNotas, totalModulos, moduloIniciado } = require("../controllers/apiDadosController");
const router = express.Router();

/**
 * @swagger
 * /apiDados/perguntasErradas:
 *   get:
 *     summary: Obter as cinco perguntas mais erradas
 *     tags: [Atividade]
 *     responses:
 *       200:
 *         description: Lista das cinco perguntas mais erradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TEXTO:
 *                     type: string
 *                     example: "Texto da pergunta"
 *                   ERRO:
 *                     type: integer
 *                     example: 10
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   examples:
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco de dados"
 *                     sem_registros:
 *                       summary: Sem registros
 *                       value: "Não há nenhum resultado!"
 */

/**
 * @swagger
 * /apiDados/perguntasCertas:
 *   get:
 *     summary: Obter as cinco perguntas mais acertadas
 *     tags: [Atividade]
 *     responses:
 *       200:
 *         description: Lista das cinco perguntas mais acertadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TEXTO:
 *                     type: string
 *                     example: "Texto da pergunta"
 *                   ACERTO:
 *                     type: integer
 *                     example: 10
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   examples:
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco"
 *                     sem_registros:
 *                       summary: Sem registros
 *                       value: "Não há nenhum resultado!"
 */

/**
 * @swagger
 * /apiDados/pessoasCertificado:
 *   get:
 *     summary: Obter a quantidade de usuários certificados
 *     tags: [Usuário]
 *     responses:
 *       200:
 *         description: Quantidade de usuários certificados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Quantidade_de_usuarios:
 *                     type: integer
 *                     example: 100
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   examples:
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco"
 *                     sem_registros:
 *                       summary: Sem registros
 *                       value: "Não há nenhum resultado!"
 */






















/**
 * @swagger
 * /apiDados/perguntasCertas:
 *   get:
 *     summary: Top 5 perguntas certas
 *     tags: [Dados Estatísticos]
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
 *                   pergunta:
 *                     type: string
 *                     example: "Qual é o maior planeta do sistema solar?"
 *                   quantidadeAcertos:
 *                     type: integer
 *                     example: 30
 */

/**
 * @swagger
 * /apiDados/pessoasCertificado:
 *   get:
 *     summary: Pessoas com certificado
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Lista de pessoas que possuem certificados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: "João Silva"
 *                   certificado:
 *                     type: string
 *                     example: "Certificado de Conclusão"
 */

/**
 * @swagger
 * /apiDados/quantidadeCertificado:
 *   get:
 *     summary: Quantidade total de certificados
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Total de certificados emitidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCertificados:
 *                   type: integer
 *                   example: 150
 */

/**
 * @swagger
 * /apiDados/mediaNotas:
 *   get:
 *     summary: Média de notas
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Média de notas obtida pelos usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 media:
 *                   type: number
 *                   format: float
 *                   example: 8.5
 */

/**
 * @swagger
 * /apiDados/totalModulos:
 *   get:
 *     summary: Total de módulos
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Número total de módulos disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalModulos:
 *                   type: integer
 *                   example: 20
 */

/**
 * @swagger
 * /apiDados/moduloIniciado:
 *   get:
 *     summary: Total de módulos iniciados
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Número total de módulos que foram iniciados pelos usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modulosIniciados:
 *                   type: integer
 *                   example: 15
 */

router.get('/perguntasErradas', perguntasErradas); //top 5 perguntas erradas;
router.get('/perguntasCertas', perguntasCertas); // top 5 perguntas certas;
router.get('/pessoasCertificado', pessoasCertificado); // pessoas com certificado
router.get('/quantidadeCertificado', quantidadeCertificado); // quantidade de certificados no banco
router.get('/mediaNotas', mediaNotas); //media de notas
router.get('/totalModulos', totalModulos); //total modulos;
router.get('/moduloIniciado', moduloIniciado); //modulos iniciados


module.exports = router;