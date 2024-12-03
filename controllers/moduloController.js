const db = require('../database/db');

//localhost:8079/modulo/cadastro
const cadastrar = (req, res) => {
    const { nome, porcentagem_necessaria } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "Nome é obrigatório" });
    }

    const insereModulo = "INSERT INTO modulo (NOME, PORCENTAGEM_NECESSARIA) VALUES(?, ?)";

    db.query(insereModulo, [nome, porcentagem_necessaria || '60'], (err) => {
        if (err){
            return res.status(400).send("Não foi possível inserir o módulo.");
        }

        // Obtendo o ID do módulo recém-cadastrado
        db.query("SELECT id_modulo FROM modulo WHERE nome = ?", [nome], (err, result) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao buscar ID do módulo." });
            }

            const idModulo = result[0].id_modulo;

            // Obtendo todas as IDs dos usuários
            db.query("SELECT id_usuario FROM usuario", (err, results) => {
                if (err) {
                    return res.status(400).json({ mensagem: "Erro ao buscar IDs dos usuários." });
                }

                // Usando forEach para relacionar todos os usuários com o módulo recém-cadastrado
                results.forEach((result) => {
                    const idUsuario = result.id_usuario;
                    const insereUsuarioModulo = "INSERT INTO usuario_modulo (FK_MODULO_ID_MODULO, FK_USUARIO_ID_USUARIO) VALUES (?, ?)";

                    db.query(insereUsuarioModulo, [idModulo, idUsuario], (err) => {
                        if (err) {
                            console.error('Erro ao inserir na tabela usuario_modulo:', err.stack);
                        }
                    });
                });

                res.status(200).json({ mensagem: "Módulo cadastrado com sucesso e relacionado com todos os usuários." });
            });
        });
    });
};

//localhost:8079/modulo/editarNome
const editarNome = (req, res) => {

    const { id, nome } = req.body;

    const procuraId = "SELECT * FROM modulo WHERE id_modulo = ?";
    const verificaNomeModulo = "SELECT * FROM modulo WHERE nome = ?";
    const alteraNome = "UPDATE modulo set nome = ? WHERE id_modulo = ?"

    if (!id || !nome){
        return res.status(400).json({ mensagem: "É necessário informar o ID e nome" });
    }

    db.query(procuraId, [id], (err, results) => {

        if (err){
            return res.status(400).json({ mensagme: "Erro ao consultar o banco !" });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não existe modulo com este ID" });
        }
        //verifica se o nome já é utilizado por algum modulo
        db.query(verificaNomeModulo, [nome, true], (err, results) => {

            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
            }
            if (results.length != 0){
                return res.status(400).json({ mensagem: "Já existe módulos com este nome !" });
            }
            //Se não houver, altera o nome do módulo
            db.query(alteraNome, [nome, id], (err, results) => {
                if (err){
                    return res.status(400).json({ mensagem: "Erro ao alterar o nome !" });
                }

                res.status(200).json({ mensagem: "Nome alterado com sucesso !" })
            })
        })
    })
}

//localhost:8079/modulo/editarModulo
const editarModulo = (req, res) => {

    const { id, nome, porcentagem } = req.body;

    const procuraId = "SELECT * FROM modulo WHERE id_modulo = ?";
    const verificaNomeModulo = "SELECT * FROM modulo WHERE nome = ?";
    const alterarModulo = "UPDATE modulo set nome = ?, porcentagem_necessaria = ? WHERE id_modulo = ?"

    if (!id || !nome || !porcentagem){
        return res.status(400).json({ mensagem: "É necessário informar o id, nome e porcentagem necessaria" });
    } 

    db.query(procuraId, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagme: "Erro ao consultar o banco!" })
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não existe modulo com este id" })
        } 

        db.query(verificaNomeModulo, [nome, true], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." })
            } 
            if (results.length != 0){
                return res.status(400).json({ mensagem: "Já existe módulos com este nome !" })
            } 

            db.query(alterarModulo, [nome, porcentagem, id], (err, results) => {
                if (err){
                    return res.status(400).json({ mensagem: " Erro ao alterar modulo !" })
                } 

                res.status(200).json({ mensagem: "Modulo alterado com sucesso !" })
            })
        })
    })
}

//localhost:8079/modulo/selecionarModulos
const selecionarTodosModulos = (req, res) => {
    //seleciona todos os módulos
    const selecionar = "SELECT id_modulo, status, nome, porcentagem_necessaria, status FROM modulo";

    db.query(selecionar, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhum módulo cadastrado" });
        }

        const modulos = results;

        return res.status(200).json(modulos);
    });
}

const selecionarTodosModulosAtivados = (req, res) => {
    //seleciona todos os módulos que estão ativos
    const selecionar = "SELECT id_modulo, nome, porcentagem_necessaria, status FROM modulo WHERE status = 1";

    db.query(selecionar, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhum módulo cadastrado" });
        }

        const modulos = results;

        return res.status(200).json(modulos);
    });
};

const selecionarPorcentagemModuloAtual = (req, res) => {
    const idModulo = req.query.idModulo; 
    const selecionar = "SELECT porcentagem_necessaria FROM modulo WHERE id_modulo = ? AND status = 1";

    db.query(selecionar, [idModulo], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não encontramos o módulo pelo ID dele!" });
        }

        const modulos = results;

        return res.status(200).json(modulos);
    });
};

//localhost:8079/modulo/desativarModulo
const desativarModulo = (req, res) => {

    const { id } = req.body;
    const desativar = "UPDATE modulo SET status = 0 WHERE id_modulo = ?";

    if (!id){
        return res.status(400).json({ mensagem: "É necessário informar o id" });
    }

    db.query(desativar, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Nenhum módulo foi encontrado !" });
        }

        return res.status(200).json({ mensagem: "Modulo desativado com sucesso" });
    })
}

//localhost:8079/modulo/ativarModulo
const ativarModulo = (req, res) => {

    const { id } = req.body;
    const ativar = "UPDATE modulo SET status = true WHERE id_modulo = ?";

    if (!id){
        return res.status(400).json({ mensagem: "É necessário informar o id" });
    }

    db.query(ativar, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Nenhum módulo foi encontrado !" });
        }

        return res.status(200).json({ mensagem: "Modulo ativado com sucesso" });
    })
}
module.exports = { cadastrar, editarNome, editarModulo, selecionarTodosModulos, selecionarTodosModulosAtivados, selecionarPorcentagemModuloAtual, desativarModulo, ativarModulo }

//Falta editar porcentagem