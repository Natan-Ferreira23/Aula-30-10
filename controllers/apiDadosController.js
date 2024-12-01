// const bCrypt = require("bcrypt");
const db = require('../database/db');
// const jwt = require('jsonwebtoken');

//VERIFICADO

//localhost:8079/apiDados/perguntasErradas
const perguntasErradas = (req, res) => {

    const sql = `SELECT TEXTO, ERRO FROM ATIVIDADE ORDER BY ERRO DESC LIMIT 5;`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const top5PerguntasErradas = results;

        return res.status(200).json(top5PerguntasErradas);
    })
};

//localhost:8079/apiDados/perguntasCertas
const perguntasCertas = (req, res) => {

    const sql = `SELECT TEXTO, ACERTO FROM ATIVIDADE ORDER BY ACERTO DESC LIMIT 5;`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const top5PerguntasCertas = results;

        return res.status(200).json(top5PerguntasCertas);
    });
}

//localhost:8079/apiDados/pessoasCertificado
const pessoasCertificado = (req, res) => {

    const sql = `SELECT COUNT(*) AS Quantidade_de_usuarios FROM USUARIO WHERE STATUS = 1;`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const PessoasCertificado = results;

        return res.status(200).json(PessoasCertificado);
    });
}

//localhost:8079/apiDados/quantidadeCertificado
const quantidadeCertificado = (req, res) => {

    const sql = `SELECT COUNT(*) AS Quantidade_de_certificados FROM CERTIFICADO WHERE STATUS = TRUE;`;

    db.query(sql, [true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const quantidadeCertificado = results;

        return res.status(200).json(quantidadeCertificado);
    });
}

//localhost:8079/apiDados/mediaNotas
const mediaNotas = (req, res) => {

    const sql = `SELECT NOTA_FINAL FROM USUARIO_MODULO WHERE STATUS = ?;`;

    db.query(sql, [true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const mediaNotas = results;

        return res.status(200).json(mediaNotas);
    });
}

//localhost:8079/apiDados/moduloIniciado
const moduloIniciado = (req, res) => {

    const sql = `SELECT COUNT(*) as Iniciado_modulos FROM USUARIO_MODULO WHERE iniciado = TRUE AND STATUS = TRUE;`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há nenhum resultado !" });

        const moduloIniciado = results;

        return res.status(200).json(moduloIniciado);
    });
}

//localhost:8079/apiDados/totalModulos
const totalModulos = (req, res) => {

    const sql = `SELECT COUNT(*) as Total_modulos FROM usuario_modulo WHERE STATUS = ?;`;

    db.query(sql, [true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const totalModulos = results;

        return res.status(200).json(totalModulos);
    });
}

module.exports = { perguntasErradas, perguntasCertas, pessoasCertificado, quantidadeCertificado, mediaNotas, totalModulos, moduloIniciado };