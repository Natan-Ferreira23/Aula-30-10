const db = require('../database/db');
const jwt = require('jsonwebtoken');

//localhost:8079/atividade/cadastro
const cadastrar = (req, res) => {
    const { respostaCerta, nome, texto, idModulo } = req.body;
    const insereAtividade = "INSERT INTO atividade (resposta_certa, nome, texto, fk_id_modulo) values(?,?,?,?)";
    if (!respostaCerta) return res.status(400).json({ mensagem: "É necesário informar o campo resposta certa" });
    if (!nome) return res.status(400).json({ mensagem: "É necessário informar o nome !" });
    if (!texto) return res.status(400).json({ mensagem: "É necessário informar o texto" });
    if (!idModulo) return res.status(400).json({ mensagem: "É necessário informar o módulo" })

    db.query(insereAtividade, [respostaCerta, nome, texto, idModulo], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });

        res.status(200).json({ mensagem: " Atividade inserida com sucesso !" });
    })
}
//localhost:8079/atividade/editarAtividade
const editarAtividade = (req, res) => {
    const { idAtividade, respostaCerta, nome, texto, idModulo } = req.body;
    const editarAtividade = "UPDATE atividade SET resposta_certa = ?, nome = ?, texto = ?, fk_id_modulo = ? WHERE id_atividade = ? AND status =1";
    const verificaAitividade = "SELECT * FROM atividade WHERE status =1 and id_atividade =?";

    if (!idAtividade) return res.status(400).json({ mensagem: "Informe qual atividade deseja editar" })
    if (!respostaCerta) return res.status(400).json({ mensagem: "É necesário informar o campo resposta certa" });
    if (!nome) return res.status(400).json({ mensagem: "É necessário informar o nome !" });
    if (!texto) return res.status(400).json({ mensagem: "É necessário informar o texto" });
    if (!idModulo) return res.status(400).json({ mensagem: "É necessário informar o módulo" })
    //verifica se o id existe
    db.query(verificaAitividade, [idAtividade], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        if (results.length === 0) return res.status(400).json({ mensagem: "O id informado não existe " });
        //edita a atividade
        db.query(editarAtividade, [respostaCerta, nome, texto, idModulo, idAtividade], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });

            return res.status(200).json({ mensagem: " Atividade editada com sucesso !" });
        })
    });

}
//localhost:8079/atividade/desativarAtividade
const desativarAtividade = (req, res) => {
    const { idAtividade } = req.body;
    const desativar = "UPDATE atividade SET status = ? WHERE id_atividade =?";
    const verificar = "SELECT * FROM atividade WHERE id_atividade =? AND status =1 ";
    if (!idAtividade) return res.status(200).json({ mensagem: "Informar o id da atividade" });

    db.query(verificar, [idAtividade], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" })
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há atividade com este ID " })

        db.query(desativar, [false, idAtividade], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });

            return res.status(200).json({ mensagem: "Atividade desativada com sucesso !" });
        });
    });

}
//localhost:8079/atividade/ativarAtividade
const ativarAtividade = (req, res) => {
    const { idAtividade } = req.body;
    const ativar = "UPDATE atividade SET status = ? WHERE id_atividade =?";
    const verificar = "SELECT * FROM atividade WHERE id_atividade =? AND status =0 ";
    if (!idAtividade) return res.status(200).json({ mensagem: "Informar o id da atividade" });

    db.query(verificar, [idAtividade], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" })
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há atividade com este ID ou atividade já esta ativa" })

        db.query(ativar, [true, idAtividade], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });

            return res.status(200).json({ mensagem: "Atividade ativida com sucesso !" });
        });
    });

}
//localhost:8079/atividade/selecionarAtividades
const selecionarAtividades = (req, res) => {
    const selecao = "SELECT * FROM atividade WHERE status = 1";
    db.query(selecao, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        const atividades = results;
        return res.status(200).json(results);
    });
}
module.exports = { cadastrar, editarAtividade, desativarAtividade, ativarAtividade, selecionarAtividades }