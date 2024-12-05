const db = require('../database/db');

//localhost:8079/alternativa/cadastro
const cadastrar = (req, res) => {

    const { texto, respostaCerta, idAtividade } = req.body;
    const inserir = "INSERT INTO alternativa (texto, resposta_certa, fk_atividade_id_atividade) VALUES (?,?,?)";

    if (!texto || !respostaCerta === undefined || !idAtividade){
        console.log("Texto: " + texto);
        console.log("Resposta certa: " + respostaCerta);
        console.log("ID atividade: " + idAtividade);
        return res.status(400).json({ mensagem: "É necessário informar o texto, se é a resposta certa e chave estrangeira" });
    }

    db.query(inserir, [texto, respostaCerta, idAtividade], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        }

        return res.status(200).json({ mensagem: "Atividade cadastrado com sucesso !" })
    });
}

//localhost:8079/alternativa/editarAlternativa
const editarAlternativa = (req, res) => {

    const { id, texto } = req.body;
    const verifica = "SELECT * FROM alternativa WHERE id_alternativa = ?";
    const atualizarAlternativa = "UPDATE alternativa SET texto = ? WHERE id_alternativa = ?";

    if (!id){
        return res.status(400).json({ mensagem: "É necessário informar idAlternativa" });
    } 
    if (!texto){
        return res.status(400).json({ mensagem: "É necessário informar o texto " });
    }

    db.query(verifica, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não foi encontrado  uma alternativa com este id" });
        }

        db.query(atualizarAlternativa, [texto, id], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            } 

            return res.status(200).json({ mensagem: "Alternativa editado com sucesso !" });
        });
    });
}

//localhost:8079/alternativa/desativarAlternativa
const desativarAlternativa = (req, res) => {

    const { id } = req.body;
    const verifica = "SELECT * FROM alternativa WHERE id_alternativa = ?";
    const desativar = "UPDATE alternativa SET status = 0 WHERE id_alternativa= ?";

    if (!id){
        return res.status(400).json({ mensagem: "É necessário informar a alternativa" });
    }

    db.query(verifica, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhuma alternativa com este id" });
        } 

        db.query(desativar, [id], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            } 
            return res.status(200).json({ mensagem: "alternativa desativada com sucesso" });
        });
    })
}

//localhost:8079/alternativa/ativarAlternativa
const ativarAlternativa = (req, res) => {

    const { id } = req.body;
    const verifica = "SELECT * FROM alternativa WHERE id_alternativa = ?";
    const ativar = "UPDATE alternativa SET status = 1 WHERE id_alternativa = ?";

    if (!id){
        return res.status(400).json({ mensagem: "É necessário informar a alternativa" });
    } 

    db.query(verifica, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhuma alternativa com este id" });
        } 

        db.query(ativar, [id], (err, results) => {
            if (err){
                return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
            } 
            return res.status(200).json({ mensagem: "alternativa ativada com sucesso" });
        });
    })
}

//localhost:8079/alternativa/selecionarAlternativasModulos
const selecionarAlternativasModulos = (req, res) => {

    const selecionar = "SELECT id_alternativa, texto, resposta_certa FROM alternativa WHERE status = 1 AND fk_atividade_id_atividade = ?";

    db.query(selecionar, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhum registro na tabela de alternativas " });
        }

        const alternativas = results;

        return res.status(200).json(alternativas);
    })
}

//localhost:8079/alternativa/selecionarTodasAlternativas
const selecionarTodasAlternativas = (req, res) => {

    const selecionar = "SELECT * FROM alternativa";

    db.query(selecionar, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhum registro na tabela de alternativas " });
        } 

        const alternativas = results;

        return res.status(200).json(alternativas);
    })
}

//=====================================

//localhost:8079/alternativa/selecionarAlternativas
const selecionarAlternativas = (req, res) => {
    const selecionar = `
    SELECT 
        ALTERNATIVA.ID_ALTERNATIVA,
        ALTERNATIVA.STATUS,
        ALTERNATIVA.TEXTO,
        ALTERNATIVA.RESPOSTA_CERTA,
        ALTERNATIVA.FK_ATIVIDADE_ID_ATIVIDADE,
        ATIVIDADE.FK_MODULO_ID_MODULO,
        MODULO.NOME AS MODULO_NOME
    FROM 
        ALTERNATIVA
    JOIN 
        ATIVIDADE ON ALTERNATIVA.FK_ATIVIDADE_ID_ATIVIDADE = ATIVIDADE.ID_ATIVIDADE
    JOIN 
        MODULO ON ATIVIDADE.FK_MODULO_ID_MODULO = MODULO.ID_MODULO
  `;
  
    db.query(selecionar, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há nenhum registro na tabela de alternativas " });
        const alternativas = results;
        return res.status(200).json(alternativas);
    })
}

//=====================================

module.exports = { cadastrar, editarAlternativa, desativarAlternativa, ativarAlternativa, selecionarAlternativasModulos, selecionarTodasAlternativas, selecionarAlternativas }