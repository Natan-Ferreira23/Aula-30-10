const db = require('../database/db');
const jwt = require('jsonwebtoken');

//localhost:8079/usuarioModulo/cadastro
const cadastrar = (req, res) => {
    const { porcentagemConcluido, idModulo, idUsuario } = req.body;
    const inserir = "INSERT INTO usuario_modulo (porcentagem_concluido, fk_modulo_id_modulo, fk_usuario_id_usuario) VALUES (?,?,?)"
    if (!porcentagemConcluido) return res.status(400).json({ mensagem: "É necessário informar porcentagem concluida" });
    if (!idModulo) return res.status(400).json({ mensagem: "É necessário id do modulo" });
    if (!idUsuario) return res.status(400).json({ mensagem: "É necessário id do usuário " });

    db.query(inserir, [porcentagemConcluido, idModulo, idUsuario], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        return res.status(200).json({ mensagem: "usuario_modulo inserido com sucesso !" });
    });
}

//localhost:8079/usuarioModulo/editarUsuarioModulo
const editarUsuarioModulo = (req, res) => {
    const { id, porcentagemConcluido, idModulo, idUsuario } = req.body;
    const verificar = "SELECT * FROM usuario_modulo WHERE id_usuario_modulo=? ";
    const editar = "UPDATE usuario_modulo SET porcentagem_concluido=?, fk_modulo_id_modulo=?, fk_usuario_id_usuario =? WHERE id_usuario_modulo = ?";
    if (!porcentagemConcluido) return res.status(400).json({ mensagem: "É necessário informar porcentagem concluida" });
    if (!idModulo) return res.status(400).json({ mensagem: "É necessário id do modulo" });
    if (!idUsuario) return res.status(400).json({ mensagem: "É necessário id do usuário " });

    db.query(verificar, [id, true], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há registros com este id " });

        db.query(editar, [porcentagemConcluido, idModulo, idUsuario, id], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
            return res.status(200).json({ mensagem: "usuario_modulo editado com sucesso !" });
        });
    })
}
//localhost:8079/usuarioModulo/selecionarUsuariosModulos
const selecionarUsuarioModulo = (req, res) => {
    const selecionar = "SELECT * FROM usuario_modulo";

    db.query(selecionar, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao coontultar o banco !" });
        if (results.length === 0) return res.status(400).json({ mensagem: "Não há dados na tabela !" });
        const usuarios_modulos = results;
        return res.status(200).json(usuarios_modulos);
    });
}
module.exports = { cadastrar, editarUsuarioModulo, selecionarUsuarioModulo }