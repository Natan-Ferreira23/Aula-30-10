const express = require('express');
const { perguntasErradas, perguntasCertas, pessoasCertificado, quantidadeCertificado, mediaNotas, totalModulos, moduloIniciado } = require("../controllers/apiDadosController");
const router = express.Router();
/**
 * @swagger
 * /apiDados/perguntasErradas:
 *   get:
 *     summary: Top 5 perguntas erradas
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Lista de perguntas erradas
 */

/**
 * @swagger
 * /apiDados/mediaNotas:
 *   get:
 *     summary: Média de notas
 *     tags: [Dados Estatísticos]
 *     responses:
 *       200:
 *         description: Média de notas retornada
 */

router.get('/perguntasErradas', perguntasErradas); //top 5 perguntas erradas;
router.get('/perguntasCertas', perguntasCertas); // top 5 perguntas certas;
router.get('/pessoasCertificado', pessoasCertificado); // pessoas com certificado
router.get('/quantidadeCertificado', quantidadeCertificado); // quantidade de certificados no banco
router.get('/mediaNotas', mediaNotas); //media de notas
router.get('/totalModulos', totalModulos); //total modulos;
router.get('/moduloIniciado', moduloIniciado); //modulos iniciados


module.exports = router;