const db = require('../database/db');
// const jwt = require('jsonwebtoken');

//VERIFICADO

//localhost:8079/certificado/cadastro
const cadastrar = (req, res) => {

    const { texto, horas, dataConclusao, idUsuario } = req.body;

    const inserir = "INSERT certificado (texto, horas, data_conclusao, fk_usuario_id_usuario) VALUES (?,?,?,?)";

    if (!dataConclusao) {
        return res.status(400).json({ mensagem: "É necessário informar a data de conclusão" });
    }
    if (!horas) {
        return res.status(400).json({ mensagem: "É necessário informar as horas" });
    }
    if (!idUsuario) {
        return res.status(400).json({ mensagem: "É necessário informar o id do usuario" });
    }

    const dataInput = dataConclusao; // recebido pelo body
    const [dia, mes, ano] = dataInput.split('/');
    const dataFormatada = String(ano + "-" + mes + "-" + dia); // Formato YYYY-MM-DD

    db.query(inserir, [texto, horas, dataFormatada, idUsuario], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        }

        return res.status(200).json({ mensagem: "Certificado cadastrado com sucesso !" })
    });
}

//====================================================================================================================
//VERIFICAR DATA!!!
//====================================================================================================================
//localhost:8079/certificado/editarCertificado
const editarCertificado = (req, res) => {

    const { id, texto, horas, dataConclusao, } = req.body;

    const editar = "UPDATE certificado SET texto = ?, horas = ?, data_conclusao=? WHERE id_certificado = ?";

    if (!dataConclusao) {
        return res.status(400).json({ mensagem: "É necessário informar a data de conclusao" });
    }
    if (!horas) {
        return res.status(400).json({ mensagem: "É necessário informar as horas" });
    }
    if (!id) {
        return res.status(400).json({ mensagem: "É necessário o id" });
    }

    const dataInput = dataConclusao; // recebido pelo body
    const [dia, mes, ano] = dataInput.split('/');
    const dataFormatada = String(ano + "-" + mes + "-" + dia); // Formato YYYY-MM-DD

    db.query(editar, [texto, horas, dataFormatada, id], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco " });
        }

        return res.status(200).json({ mensagem: "certificado editado com sucesso " });
    });
}

//localhost:8079/certificado/desativarCertificado
const desativarCertificado = (req, res) => {

    const { id } = req.body;

    const verificar = "SELECT * FROM certificado WHERE  id_certificado = ? AND status = ?";
    const desativar = "UPDATE certificado SET status = false WHERE id_certificado = ?";

    if (!id) return res.status(400).json({ mensagem: "É necessário informar o id" });

    db.query(verificar, [id, true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: " Erro ao consultar o banco de dados !" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não existe registro com esse id no banco" });
        }

        db.query(desativar, [id], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados !" });
            }

            return res.status(200).json({ mensagem: "Certificado desativado com sucesso !" });
        })
    });
}

//localhost:8079/certificado/ativarCertificado
const ativarCertificado = (req, res) => {

    const { id } = req.body;

    const verificar = "SELECT * FROM certificado WHERE  id_certificado = ? AND status = ?";
    const desativar = "UPDATE certificado SET status = ? WHERE id_certificado = ?";

    if (!id) {
        return res.status(400).json({ mensagem: "É necessário informar o id" });
    }

    db.query(verificar, [id, false], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: " Erro ao consultar o banco de dados !" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não existe registro com esse id no banco ou já esta ativo" });
        }

        db.query(desativar, [true, id], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados !" });
            }

            return res.status(200).json({ mensagem: "Certificado ativado com sucesso !" });
        })
    });
}

//localhost:8079/certificado/selecionarCertificados
const selecionarCertificados = (req, res) => {
    const selecionar = "SELECT * FROM certificado";

    db.query(selecionar, [true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        }

        const certificados = results;

        return res.status(200).json(certificados);
    });
}

module.exports = { cadastrar, editarCertificado, desativarCertificado, ativarCertificado, selecionarCertificados }