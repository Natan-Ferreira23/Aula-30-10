const db = require('../database/db');
// const jwt = require('jsonwebtoken');

//VERIFICADO

//localhost:8079/modulo/cadastro
const cadastrar = (req, res) => {
    const { nome, porcentagem } = req.body;

    if (nome.length > 100 && nome.length < 0) {
        res.status(400).json({ mensagem: "Nome do usuario necessita ser menor que 100 digitos" });
    } else {

        const insereModulo = "INSERT INTO modulo(nome, porcentagem_necessaria) VALUES (?, ?) ";
        const procuraNome = "SELECT nome FROM modulo WHERE nome = ?";

        if (!nome || !porcentagem) {
            return res.status(400).json({ mensagem: "É obrigatório informar o nome e porcentagem !" });
        }

        if (isNaN(porcentagem)) {
            return res.status(400).json({ mensagme: "O numero deve ser um numero" });
        }

        db.query(procuraNome, [nome], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
            }
            if (results != 0) {
                return res.status(400).json({ mensagem: "Um módulo com este nome já existe no sistema" });
            }

            db.query(insereModulo, [nome, porcentagem], (err, results) => {
                if (err) {
                    return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
                }

                res.status(200).json({ mensagem: "Módulo inserido com sucesso !!" })
            });
        })
    }
}

//localhost:8079/modulo/editarNome
const editarNome = (req, res) => {

    const { id, nome } = req.body;

    const procuraId = "SELECT * FROM modulo WHERE id_modulo = ?";
    const verificaNomeModulo = "SELECT * FROM modulo WHERE nome = ?";
    const alteraNome = "UPDATE modulo set nome = ? WHERE id_modulo = ?"

    if (!id || !nome) {
        return res.status(400).json({ mensagem: "É necessário informar o ID e nome" });
    }

    db.query(procuraId, [id], (err, results) => {

        if (err) {
            return res.status(400).json({ mensagme: "Erro ao consultar o banco !" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não existe modulo com este ID" });
        }
        //verifica se o nome já é utilizado por algum modulo
        db.query(verificaNomeModulo, [nome, true], (err, results) => {

            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
            }
            if (results.length != 0) {
                return res.status(400).json({ mensagem: "Já existe módulos com este nome !" });
            }
            //Se não houver, altera o nome do módulo
            db.query(alteraNome, [nome, id], (err, results) => {
                if (err) {
                    return res.status(400).json({ mensagem: "Erro ao alterar o nome !" });
                }

                res.status(200).json({ mensagem: "Nome alterado com sucesso !" })
            })
        })
    })
}

//localhost:8079/modulo/editarModulo
const editarModulo = (req, res) => {

    const { id, nome, porcentagem_necessaria } = req.body;

    const procuraId = "SELECT * FROM modulo WHERE id_modulo = ?";
    const verificaNomeModulo = "SELECT * FROM modulo WHERE nome = ?";
    const alterarModulo = "UPDATE modulo set nome = ?, porcentagem_necessaria = ? WHERE id_modulo = ?"

    if (!id || !nome || !porcentagem_necessaria) {
        return res.status(400).json({ mensagem: "É necessário informar o id, nome e porcentagem necessaria" });
    }

    db.query(procuraId, [id], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagme: "Erro ao consultar o banco!" })
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não existe modulo com este id" })
        }

        db.query(verificaNomeModulo, [nome, true], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." })
            }
            if (results.length != 0) {
                return res.status(400).json({ mensagem: "Já existe módulos com este nome !" })
            }

            db.query(alterarModulo, [nome, porcentagem_necessaria, id], (err, results) => {
                if (err) {
                    return res.status(400).json({ mensagem: " Erro ao alterar modulo !" })
                }

                res.status(200).json({ mensagem: "Modulo alterado com sucesso !" })
            })
        })
    })
}

//localhost:8079/modulo/selecionarModulos
const selecionarTodosModulos = (req, res) => {

    //seleciona todos os módulos que estão ativos
    const selecionar = "SELECT id_modulo, nome, porcentagem_necessaria, status FROM modulo";

    db.query(selecionar, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum módulo cadastrado" });
        }

        const modulos = results;

        return res.status(200).json(modulos);
    });
}

//localhost:8079/modulo/desativarModulo
const desativarModulo = (req, res) => {

    const { id } = req.body;
    const desativar = "UPDATE modulo SET status = 0 WHERE id_modulo = ?";

    if (!id) {
        return res.status(400).json({ mensagem: "É necessário informar o id" });
    }

    db.query(desativar, [id], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Nenhum módulo foi encontrado !" });
        }

        return res.status(200).json({ mensagem: "Modulo desativado com sucesso" });
    })
}

//localhost:8079/modulo/ativarModulo
const ativarModulo = (req, res) => {

    const { id } = req.body;
    const ativar = "UPDATE modulo SET status = true WHERE id_modulo = ?";

    if (!id) {
        return res.status(400).json({ mensagem: "É necessário informar o id" });
    }

    db.query(ativar, [id], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Nenhum módulo foi encontrado !" });
        }

        return res.status(200).json({ mensagem: "Modulo ativado com sucesso" });
    })
}
module.exports = { cadastrar, editarNome, editarModulo, selecionarTodosModulos, desativarModulo, ativarModulo }

//Falta editar porcentagem