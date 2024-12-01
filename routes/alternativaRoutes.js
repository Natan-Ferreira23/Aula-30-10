const express = require('express');
const { cadastrar, editarAlternativa, desativarAlternativa, ativarAlternativa, selecionarAlternativasModulos, selecionarTodasAlternativas, selecionarAlternativas } = require("../controllers/alternativaController");
const router = express.Router();
/**
 * @swagger
 * /cadastrar:
 *   post:
 *     summary: Cadastrar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Texto da alternativa
 *                 example: "Qual é a capital da França?"
 *               respostaCerta:
 *                 type: boolean
 *                 description: Indica se a alternativa é a resposta certa
 *                 example: true
 *               idAtividade:
 *                 type: integer
 *                 description: ID da atividade associada
 *                 example: 123
 *     responses:
 *       200:
 *         description: Atividade cadastrada com sucesso!
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
 *                     parametros_ausentes:
 *                       summary: Parâmetros ausentes
 *                       value: "É necessário informar o texto, se é a resposta certa e chave estrangeira"
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco de dados"
 */

/**
 * @swagger
 * /editar:
 *   post:
 *     summary: Editar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAlternativa:
 *                 type: integer
 *                 description: ID da alternativa a ser editada
 *                 example: 1
 *               respostaCerta:
 *                 type: boolean
 *                 description: Indica se a alternativa é a resposta certa
 *                 example: true
 *               texto:
 *                 type: string
 *                 description: Texto da alternativa
 *                 example: "Nova descrição da alternativa"
 *     responses:
 *       200:
 *         description: Alternativa editada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Alternativa editada com sucesso!"
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
 *                     parametros_ausentes:
 *                       summary: Parâmetros ausentes
 *                       value: "É necessário informar idAlternativa"
 *                     texto_ausente:
 *                       summary: Texto ausente
 *                       value: "É necessário informar o texto"
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco"
 *                     alternativa_nao_encontrada:
 *                       summary: Alternativa não encontrada
 *                       value: "Não foi encontrado uma alternativa com este id"
 */

/**
 * @swagger
 * /alternativa/desativarAlternativa:
 *   post:
 *     summary: Desativar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAlternativa:
 *                 type: integer
 *                 description: ID da alternativa a ser desativada
 *                 example: 1
 *     responses:
 *       200:
 *         description: Alternativa desativada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Alternativa desativada com sucesso!"
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
 *                     parametro_ausente:
 *                       summary: Parâmetro ausente
 *                       value: "É necessário informar a alternativa"
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco!"
 *                     alternativa_nao_encontrada:
 *                       summary: Alternativa não encontrada
 *                       value: "Não há nenhuma alternativa com este id"
 */

/**
 * @swagger
 * /alternativa/ativarAlternativa:
 *   post:
 *     summary: Ativar alternativa
 *     tags: [Alternativa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAlternativa:
 *                 type: integer
 *                 description: ID da alternativa a ser ativada
 *                 example: 1
 *     responses:
 *       200:
 *         description: Alternativa ativada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Alternativa ativada com sucesso!"
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
 *                     parametro_ausente:
 *                       summary: Parâmetro ausente
 *                       value: "É necessário informar a alternativa"
 *                     erro_banco:
 *                       summary: Erro no banco de dados
 *                       value: "Erro ao consultar o banco!"
 *                     alternativa_nao_encontrada:
 *                       summary: Alternativa não encontrada
 *                       value: "Não há nenhuma alternativa com este id"
 */

/**
 * @swagger
 * /alternativa/selecionarAlternativasModulos:
 *   get:
 *     summary: Selecionar alternativas de módulos
 *     tags: [Alternativa]
 *     parameters:
 *       - in: query
 *         name: fk_atividade_id_atividade
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID da atividade associada
 *     responses:
 *       200:
 *         description: Lista de alternativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_alternativa:
 *                     type: integer
 *                     example: 1
 *                   texto:
 *                     type: string
 *                     example: "Texto da alternativa"
 *                   resposta_certa:
 *                     type: boolean
 *                     example: true
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
 *                       value: "Não há nenhum registro na tabela de alternativas"
 */

/**
 * @swagger
 * /alternativa/selecionarTodasAlternativas:
 *   get:
 *     summary: Selecionar todas as alternativas
 *     tags: [Alternativa]
 *     responses:
 *       200:
 *         description: Lista de todas as alternativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_alternativa:
 *                     type: integer
 *                     example: 1
 *                   texto:
 *                     type: string
 *                     example: "Texto da alternativa"
 *                   resposta_certa:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: integer
 *                     example: 1
 *                   fk_atividade_id_atividade:
 *                     type: integer
 *                     example: 1
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
 *                       value: "Não há nenhum registro na tabela de alternativas"
 */

router.post('/cadastro', cadastrar);
router.put('/editarAlternativa', editarAlternativa);
router.put('/desativarAlternativa', desativarAlternativa);
router.put('/ativarAlternativa', ativarAlternativa);
router.get('/selecionarAlternativasModulos', selecionarAlternativasModulos);
router.get('/selecionarTodasAlternativas', selecionarTodasAlternativas);
router.get('/selecionarAlternativas', selecionarAlternativas);

module.exports = router;