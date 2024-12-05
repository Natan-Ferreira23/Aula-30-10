const db = require('../database/db');
// const jwt = require('jsonwebtoken');

//VERIFICADO

//localhost:8079/atividade/cadastro
const cadastrar = (req, res) => {

    const { texto, idModulo } = req.body;

    const insereAtividade = "INSERT INTO atividade (texto, fk_modulo_id_modulo) values(?,?)";

    if ( !texto || !idModulo ){
        return res.status(400).json({ mensagem: "Alguma informação esta vazia" });
    } 

    db.query(insereAtividade, [ texto, idModulo], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }

        res.status(200).json({ mensagem: " Atividade inserida com sucesso !" });
    })
}

//localhost:8079/atividade/editarAtividade
const editarAtividade = (req, res) => {

    const { id, texto } = req.body;

    const editarAtividade = "UPDATE atividade SET texto = ? WHERE id_atividade = ?";
    const verificaAitividade = "SELECT * FROM atividade WHERE id_atividade = ?";

    if (!id){
        return res.status(400).json({ mensagem: "Informe qual atividade deseja editar" });
    }
    if (!texto){
        return res.status(400).json({ mensagem: "É necessário informar o texto" });
    } 

    //verifica se o id existe
    db.query(verificaAitividade, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "O id informado não existe " });
        } 

        //edita a atividade
        db.query(editarAtividade, [texto, id], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
            } 

            return res.status(200).json({ mensagem: " Atividade editada com sucesso !" });
        })
    });
};

//localhost:8079/atividade/desativarAtividade
const desativarAtividade = (req, res) => {

    const { id } = req.body;

    const desativar = "UPDATE atividade SET status = 0 WHERE id_atividade = ?";
    const verificar = "SELECT * FROM atividade WHERE id_atividade = ? AND status = 1";

    if (!id){
        return res.status(200).json({ mensagem: "Informar o id da atividade" });
    } 

    db.query(verificar, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há atividade com este ID " });
        } 

        db.query(desativar, [id], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
            } 

            return res.status(200).json({ mensagem: "Atividade desativada com sucesso !" });
        });
    });
}

//localhost:8079/atividade/ativarAtividade
const ativarAtividade = (req, res) => {

    const { id } = req.body;

    const ativar = "UPDATE atividade SET status = 1 WHERE id_atividade = ?";
    const verificar = "SELECT * FROM atividade WHERE id_atividade = ? AND status = 0 ";

    if (!id) return res.status(200).json({ mensagem: "Informar o id da atividade" });

    db.query(verificar, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há atividade com este ID ou atividade já esta ativa" });
        } 

        db.query(ativar, [id], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
            } 

            return res.status(200).json({ mensagem: "Atividade ativida com sucesso !" });
        });
    });

}

//localhost:8079/atividade/selecionarAtividadesAdmin
// const selecionarAtividadesAdmin = (req, res) => {

//     const selecao = "SELECT a.id_atividade, a.texto, m.nome FROM atividade as a inner join modulo m on m.id_modulo = a.fk_modulo_id_modulo  ";

//     db.query(selecao, (err, results) => {
//         if (err){
//             return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
//         } 

//         const atividades = results;

//         return res.status(200).json(results);
//     });
// }

//localhost:8079/atividade/selecionarAtividadesAtivo
const selecionarAtividadesAtivo = (req, res) => {

    const selecao = "SELECT * FROM atividade WHERE status = 1";

    db.query(selecao, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        } 

        const atividades = results;

        return res.status(200).json(results);
    });
}

//localhost:8079/atividade/selecionarAtividadesAdmin
const selecionarAtividadesAdmin = (req, res) => {

    const selecao = "SELECT * FROM atividade";

    db.query(selecao, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        } 

        const atividades = results;

        return res.status(200).json(results);
    });
}

//localhost:8079/atividade/selecionarAtividade
const selecionarAtividade = (req, res) => {

    const selecao = "SELECT * FROM atividade WHERE id_atividade = ?";

    db.query(selecao, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        } 

        const atividades = results;

        return res.status(200).json(results);
    });
}

//localhost:8079/atividade/acertar
const acertar = (req, res) => {

    const { idAtividadeAtual } = req.body;

    const procuraAtividade = "SELECT acertos FROM atividade WHERE id_atividade = ?";
    const inserindoAcerto = "UPDATE atividade SET acertos = ? WHERE id_atividade = ? ";

    //procura o acerto através do ID da atividade
    db.query(procuraAtividade, [idAtividadeAtual], (err, results) => {
        if (err){
            return res.status(200).json({ mensagem: "Erro ao consultar o banco" });
        } 
        if (results.length === 0){
            return res.status(200).json({ mensagem: "Não registros no banco" });
        } 

        const acertos = results[0].acertos + 1; //acrescenta um acerto

        //atualiza o acerto no banco 
        db.query(inserindoAcerto, [acertos, idAtividadeAtual], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            } 

            return res.status(200).json({ mensagem: "Você acertou" });
        });
    })
}

//localhost:8079/atividade/errar
const errar = (req, res) => {

    const { idAtividadeAtual } = req.body;

    const procuraErro = "SELECT erros FROM atividade WHERE id_atividade=?";
    const inserindoErro = "UPDATE atividade SET erros = ? WHERE id_atividade=? ";

    //Procuta o acerto através do id
    db.query(procuraErro, [idAtividadeAtual], (err, results) => {
        if (err){
            return res.status(200).json({ mensagem: "Erro ao consultar o banco" });
        } 
        if (results.length === 0){
            return res.status(200).json({ mensagem: "Não registros no banco" });
        } 

        let erros = results[0].erros + 1;

        //atualiza o erro no banco 
        db.query(inserindoErro, [erros, idAtividadeAtual], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            } 

            return res.status(200).json({ mensagem: "Você errou " });
        });
    })
}

//================================= 

const selecionarAtividadesPorModulo = (req, res) => {
    const idModulo = req.query.idModulo; 

    if (!idModulo) {
        return res.status(400).json({ mensagem: "O id do módulo é obrigatório!" });
    }

    const selecao = "SELECT * FROM atividade WHERE status = 1 AND fk_modulo_id_modulo = ?";
    
    db.query(selecao, [idModulo], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco!" });
        
        return res.status(200).json(results);
    });
};


//=================================

module.exports = { cadastrar, editarAtividade, desativarAtividade, ativarAtividade, selecionarAtividadesAtivo, selecionarAtividadesAdmin, selecionarAtividade, acertar, errar, selecionarAtividadesPorModulo }