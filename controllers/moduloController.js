const db = require('../database/db');
const jwt = require('jsonwebtoken');

//localhost:8079/modulo/cadastro
const cadastrar = (req, res) => {
    const { nome, porcentagem } = req.body;

    const insereModulo = "INSERT INTO modulo(nome_modulo,porcentagem_necessaria) VALUES (?, ?) ";
    const procuraNome = "SELECT nome_modulo FROM modulo WHERE nome_modulo = ?"
    if (!nome || !porcentagem) return res.status(400).json({ mensagem: "É obrigatório informar o nome e porcentagem !" })

    if (isNaN(porcentagem)) return res.status(400).json({ mensagme: "O numero deve ser um numero" })
    db.query(procuraNome, [nome], async (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." })
        if (results != 0) return res.status(400).json({ mensagem: "Um módulo com este nome já existe no sistema" })

        db.query(insereModulo, [nome, porcentagem], async (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });

            res.status(200).json({ mensagem: "Módulo inserido com sucesso !!" })
        });
    })

}
//localhost:8079/modulo/editarNome
const editarNome = (req, res) => {
    const { id, nome } = req.body;
    procuraId = "SELECT * FROM modulo WHERE id_modulo =? AND status = 1";
    verificaNomeModulo = "SELECT * FROM modulo WHERE nome_modulo =? AND status =1 ";
    alteraNome = "UPDATE modulo set nome_modulo =? WHERE id_modulo = ?"
    if (!id || !nome) return res.status(400).json({ mensagem: " É necessário informar o id e nome " });
    console.log(id + " " + nome)
    //verifica se já existe módulos com este nome
    db.query(verificaNomeModulo, [nome], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." })
        if (results.length != 0) return res.status(400).json({ mensagem: "Já existe módulos com este nome !" })
        //Se não houver, altera o nome do módulo
        db.query(alteraNome, [nome, id], (err, results) => {
            if (err) return res.status(400).json({ mensagem: " Erro ao alterar o nome !" })

            res.status(200).json({ mensagem: "Nome alterado com sucesso !" })
        })
    })
}
//localhost:8079/modulo/selecionarModulos
const selecionarTodosModulos = (req, res) => {
    //seleciona todos os módulos que estão ativos
    const selecionar = "SELECT id_modulo, nome_modulo, porcentagem_necessaria  FROM modulo WHERE STATUS =1";

    db.query(selecionar, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." })
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há nenhum módulo cadastrado" })
        const modulos = results;
        console.log(results)
        return res.status(200).json(modulos);
    });
}
const desativarModulo = (req, res) => {
    const { id } = req.body;
    const desativar = "UPDATE modulo SET status = ? WHERE id_modulo = ?";

    if (!id) return res.status(400).json({ mensagem: "É necessário informar o id" });
    db.query(desativar, [false, id], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        if (results.length === 0) return res.status(400).json({ mensagem: "Nenhum módulo foi encontrado !" })
        return res.status(200).json({ mensagem: "Modulo desativado com sucesso" });
    })
}
const ativarModulo = (req, res) => {
    const { id } = req.body;
    const ativar = "UPDATE modulo SET status = ? WHERE id_modulo = ?";

    if (!id) return res.status(400).json({ mensagem: "É necessário informar o id" });
    db.query(ativar, [true, id], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        if (results.length === 0) return res.status(400).json({ mensagem: "Nenhum módulo foi encontrado !" })
        return res.status(200).json({ mensagem: "Modulo ativado com sucesso" });
    })
}
module.exports = { cadastrar, editarNome, selecionarTodosModulos, desativarModulo, ativarModulo }