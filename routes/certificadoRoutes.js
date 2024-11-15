const express = require('express');
const { cadastrar, editarCertificado, desativarCertificado, ativarCertificado, selecionarCertificados } = require("../controllers/certificadoController");
const router = express.Router();
router.post('/cadastro', cadastrar);
router.put('/editarCertificado', editarCertificado);
router.put('/desativarCertificado', desativarCertificado);
router.put("/ativarCertificado", ativarCertificado);
router.get("/selecionarCertificados", selecionarCertificados)

module.exports = router;