const express = require('express');
const { cadastrar, editarAtividade, desativarAtividade, ativarAtividade, selecionarAtividades, acertar, errar } = require("../controllers/atividadeController");
const router = express.Router();
/**
 * @swagger
 * /atividade/cadastro:
 *   post:
 *     summary: Cadastrar atividade
 *     tags: [Atividade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Atividade cadastrada com sucesso
 */

router.post('/cadastro', cadastrar);
router.put('/editarAtividade', editarAtividade);
router.put('/desativarAtividade', desativarAtividade);
router.put('/ativarAtividade', ativarAtividade);
router.get('/selecionarAtividades', selecionarAtividades);
router.post('/acertar', acertar);
router.post('/errar', errar);
module.exports = router;