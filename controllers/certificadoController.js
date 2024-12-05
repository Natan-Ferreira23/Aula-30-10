const db = require('../database/db');

//localhost:8079/certificado/cadastro (Create)
const cadastrar = (req, res) => {
    const { texto, horas, idUsuario } = req.body;

    if (!texto || !horas || !idUsuario) {
        return res.status(400).json({ mensagem: "É necessário informar o texto, horas e id do usuário" });
    }

    // Verifica se o usuário já possui um certificado
    const verificar = "SELECT * FROM certificado WHERE fk_usuario_id_usuario = ?";
    db.query(verificar, [idUsuario], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }

        if (results.length > 0) {
            return res.status(400).json({ mensagem: "Usuário já possui um certificado cadastrado." });
        }

        // Obter a data atual do servidor
        const dataServidor = new Date();
        const anoServidor = dataServidor.getFullYear();
        const mesServidor = String(dataServidor.getMonth() + 1).padStart(2, '0');
        const diaServidor = String(dataServidor.getDate()).padStart(2, '0');
        const dataServidorFormatada = `${anoServidor}-${mesServidor}-${diaServidor}`; // Formato YYYY-MM-DD

        // Inserir o novo certificado
        const inserir = "INSERT certificado (texto, horas, data_conclusao, fk_usuario_id_usuario) VALUES (?,?,?,?)";
        db.query(inserir, [texto, horas, dataServidorFormatada, idUsuario], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao inserir o certificado" });
            }

            return res.status(200).json({ mensagem: "Certificado gerado com sucesso!" });
        });
    });
};

const cadastrarComDataConclusao = (req, res) => {

    const { texto, horas, dataConclusao, idUsuario } = req.body;

    const inserir = "INSERT certificado (texto, horas, data_conclusao, fk_usuario_id_usuario) VALUES (?,?,?,?)";

    if (!texto || !horas || !dataConclusao || !idUsuario){
        return res.status(400).json({ mensagem: "É necessário informar o texto, horas e id do usuário" });
    } 

    db.query(inserir, [texto, horas, dataConclusao, idUsuario], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        } 

        return res.status(200).json({ mensagem: "Certificado cadastrado com sucesso! Por favor, verifique com o administrador." });
    });
}

//localhost:8079/certificado/selecionarCertificados (Read)
const selecionarCertificados = (req, res) => {
    const selecionar = "SELECT * FROM certificado";

    db.query(selecionar, [true], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há nenhum resultado !" });
        } 

        const certificados = results;

        return res.status(200).json(certificados);
    });
}

//localhost:8079/certificado/selecionarCertificadosComUsuario (Read)
const selecionarCertificadosComUsuario = (req, res) => {
    const query = `
        SELECT 
            CERTIFICADO.ID_CERTIFICADO, 
            CERTIFICADO.STATUS,
            CERTIFICADO.TEXTO,
            CERTIFICADO.HORAS,
            CERTIFICADO.DATA_CONCLUSAO,
            USUARIO.NOME AS NOME_USUARIO,
            USUARIO.ID_USUARIO AS ID_USUARIO
        FROM CERTIFICADO
        INNER JOIN USUARIO ON CERTIFICADO.FK_USUARIO_ID_USUARIO = USUARIO.ID_USUARIO
        WHERE USUARIO.STATUS = 1
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco!" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Nenhum certificado encontrado!" });
        }

        return res.status(200).json(results);
    });
};

//localhost:8079/certificado/editarCertificado (Update)
const editarCertificado = (req, res) => {

    const { id, texto, horas, data_conclusao } = req.body;

    const editar = "UPDATE certificado SET texto = ?, horas = ?, data_conclusao=? WHERE id_certificado = ?";

    // Verificação simplificada
    if (!id || !texto || !horas || !data_conclusao) {
        return res.status(400).json({ mensagem: "É necessário informar o id, texto, horas e data de conclusão" });
    }

    db.query(editar, [texto, horas, data_conclusao, id], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }

        return res.status(200).json({ mensagem: "Certificado editado com sucesso!" });
    });
}

//localhost:8079/certificado/desativarCertificado (Delete - Desativar)
const desativarCertificado = (req, res) => {

    const { id } = req.body;

    const desativar = "UPDATE certificado SET status = false WHERE id_certificado = ?";

    if (!id) return res.status(400).json({ mensagem: "É necessário informar o id" });

    db.query(desativar, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados!" });
        } 

        return res.status(200).json({ mensagem: "Certificado desativado com sucesso!" });
    });
}

//localhost:8079/certificado/ativarCertificado (Delete - Ativar)
const ativarCertificado = (req, res) => {

    const { id } = req.body;

    const ativar = "UPDATE certificado SET status = true WHERE id_certificado = ?";

    if (!id) return res.status(400).json({ mensagem: "É necessário informar o id" });

    db.query(ativar, [id], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados!" });
        } 

        return res.status(200).json({ mensagem: "Certificado ativado com sucesso!" });
    });
}

module.exports = { cadastrar, cadastrarComDataConclusao, editarCertificado, desativarCertificado, ativarCertificado, selecionarCertificados, selecionarCertificadosComUsuario }