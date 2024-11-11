const db = require('../database/db');
const jwt = require('jsonwebtoken');

//localhost:8079/alternativa/cadastro
const cadastrar = (req, res) => {
    const { texto, idAtividade } = req.body;
    const inserir = "INSERT INTO alternativa (texto, fk_id_atividade) VALUES (?,?)";

    if (!texto) return res.status(400).json({ mensagem: "É necessário informar o texto " });
    if (!idAtividade) return res.status(400).json({ mensagem: "É necessário informar o id da atividade" })
    db.query(inserir, [texto, idAtividade], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        return res.status(200).json({ mensagem: "Atividade cadastrado com sucesso !" })
    });
}
//localhost:8079/alternativa/editarAlternativa
const editarAlternativa = (req, res) => {
    const { idAlternativa, texto } = req.body;
    const verifica = "SELECT * FROM alternativa WHERE status = 1 AND id_alternativa = ?";
    const atualizarAlternativa = "UPDATE alternativa SET texto =? WHERE id_alternativa = ?";
    if (!idAlternativa) return res.status(400).json({ mensagem: "É necessário informar idAlternativa" });
    if (!texto) return res.status(400).json({ mensagem: "É necessário informar o texto " });
    db.query(verifica, [idAlternativa], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não foi encontrado  uma alternativa com este id" });
        db.query(atualizarAlternativa, [texto, idAlternativa], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            return res.status(200).json({ mensagem: "Alternativa editado com sucesso !" });
        });
    });
}
//localhost:8079/alternativa/desativarAlternativa
const desativarAlternativa = (req, res) => {
    const { idAlternativa } = req.body;
    const verifica = "SELECT * FROM alternativa WHERE status = 1 AND id_alternativa = ?";
    const desativar = "UPDATE alternativa SET status = ? WHERE id_alternativa= ?";
    if (!idAlternativa) return res.status(400).json({ mensagem: "É necessário informar a alternativa" })
    db.query(verifica, [idAlternativa], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há nenhuma alternativa com este id" });
        db.query(desativar, [false, idAlternativa], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            return res.status(200).json({ mensagem: "alternativa desativada com sucesso" });
        });
    })
}
//
//localhost:8079/alternativa/ativarAlternativa
const ativarAlternativa = (req, res) => {
    const { idAlternativa } = req.body;
    const verifica = "SELECT * FROM alternativa WHERE id_alternativa = ?";
    const ativar = "UPDATE alternativa SET status = ? WHERE id_alternativa= ?";
    if (!idAlternativa) return res.status(400).json({ mensagem: "É necessário informar a alternativa" })
    db.query(verifica, [idAlternativa], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há nenhuma alternativa com este id" });
        db.query(ativar, [true, idAlternativa], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            return res.status(200).json({ mensagem: "alternativa ativada com sucesso" });
        });
    })
}

//localhost:8079/alternativa/selecionarAlternativas
const selecionarAlternativas = (req, res) => {
    const selecionar = "SELECT id_alternativa, texto FROM alternativa WHERE status =1";
    db.query(selecionar, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há nenhum registro na tabela de alternativas " });
        const alternativas = results;
        return res.status(200).json(alternativas);
    })
}

module.exports = { cadastrar, editarAlternativa, desativarAlternativa, ativarAlternativa, selecionarAlternativas }