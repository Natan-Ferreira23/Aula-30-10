const db = require('../database/db');

//localhost:8079/usuarioModulo/cadastro
const cadastrar = (req, res) => {

    const { idModulo, idUsuario } = req.body;

    const inserir = "INSERT INTO usuario_modulo (fk_modulo_id_modulo, fk_usuario_id_usuario) VALUES (?,?)"

    if (!idModulo) {
        return res.status(400).json({ mensagem: "É necessário id do modulo" });
    }
    if (!idUsuario) {
        return res.status(400).json({ mensagem: "É necessário id do usuário " });
    }

    db.query(inserir, [idModulo, idUsuario], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco!" });
        }

        return res.status(200).json({ mensagem: "usuario_modulo inserido com sucesso !" });
    });
}

//======================================================================================

const cadastrarRelacaoUsuariosModulos = (req, res) => {
    const { idModulo } = req.body;

    if (!idModulo) {
        return res.status(400).json({ mensagem: "É necessário o id do módulo" });
    }

    const buscarUsuarios = "SELECT ID_USUARIO FROM USUARIO WHERE STATUS = TRUE";
    const inserirRelacao = "INSERT INTO USUARIO_MODULO (FK_MODULO_ID_MODULO, FK_USUARIO_ID_USUARIO) VALUES (?, ?)";

    db.query(buscarUsuarios, (err, usuarios) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar os usuários no banco de dados." });
        }

        if (usuarios.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum usuário ativo encontrado." });
        }

        usuarios.forEach(usuario => {
            db.query(inserirRelacao, [idModulo, usuario.ID_USUARIO], (err) => {
                if (err) {
                    console.error(`Erro ao inserir relação para o usuário ${usuario.ID_USUARIO}: ${err.message}`);
                }
            });
        });

        res.status(200).json({ mensagem: "Relações criadas com sucesso para todos os usuários!" });
    });
};

//localhost:8079/usuarioModulo/editarUsuarioModulo
const editarUsuarioModulo = (req, res) => {

    const { aprovado, iniciado, notaFinal, id } = req.body;

    const verificar = "SELECT * FROM usuario_modulo WHERE id_usuario_modulo = ? ";
    const editar = "UPDATE usuario_modulo SET aprovado = ?, iniciado = ?, nota_final = ? WHERE id_usuario_modulo = ?";

    if (!porcentagemConcluido) {
        return res.status(400).json({ mensagem: "É necessário informar porcentagem concluida" });
    }
    if (!idModulo) {
        return res.status(400).json({ mensagem: "É necessário id do modulo" });
    }
    if (!idUsuario) {
        return res.status(400).json({ mensagem: "É necessário id do usuário " });
    }

    db.query(verificar, [id, true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há registros com este id " });
        }

        db.query(editar, [aprovado, iniciado, notaFinal, id], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
            }
            return res.status(200).json({ mensagem: "usuario_modulo editado com sucesso !" });
        });
    })
}

//localhost:8079/usuarioModulo/selecionarUsuariosModulos
const selecionarUsuarioModulo = (req, res) => {

    const selecionar = "SELECT * FROM usuario_modulo";

    db.query(selecionar, (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao coontultar o banco !" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há dados na tabela !" });
        }

        const usuarios_modulos = results;

        return res.status(200).json(usuarios_modulos);
    });
}

//localhost:8079/usuarioModulo/iniciarModulo
const iniciarModulo = (req, res) => {

    const { id } = req.body;

    const verificar = "SELECT * FROM usuario_modulo WHERE id_usuario_modulo = ? AND status = ?";
    const iniciar = "UPDATE usuario_modulo SET iniciado = true WHERE id_usuario_modulo = ?";

    db.query(verificar, [id, true], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Não há registros" });
        }

        db.query(iniciar, [id], (err, results) => {
            if (err) {
                return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
            }

            return res.status(200).json({ mensagem: "Modulo iniciado " });
        });
    });
}

//http://localhost:3000/usuarioModulo/ativarUsuarioModulo
const ativarUsuarioModulo = (req, res) => {

    const { id } = req.body;
    const ativarUsuarioModulo = "UPDATE usuario_modulo SET status = true WHERE id_usuario_modulo = ?";

    if (!id) {
        return res.status(400).json({ mensagem: "ID é obrigatorio" });
    }

    db.query(ativarUsuarioModulo, [id], (err, results) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        }

        res.status(200).json({ mensagem: "Usuário_modulo ativado!" });
    });
};

//http://localhost:3000/usuarioModulo/desativarUsuarioModulo
const desativarUsuarioModulo = (req, res) => {

    const { id } = req.body;
    const desativarUsuarioModulo = "UPDATE usuario_modulo SET status = false WHERE id_usuario_modulo = ?";

    if (!id) {
        return res.status(400).json({ mensagem: "ID é obrigatório" });
    }

    db.query(desativarUsuarioModulo, [id], (err) => {
        if (err) {
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        }

        res.status(200).json({ mensagem: "Usuário_módulo desativado!" });
    });
};

//http://localhost:3000/usuarioModulo/atualizarIniciado
const atualizarIniciado = (req, res) => {

    const { idModulo, idUsuario } = req.body;
    const atualizar = "UPDATE usuario_modulo SET iniciado = 1 WHERE fk_modulo_id_modulo = ? AND fk_usuario_id_usuario = ?";

    if (!idModulo || !idUsuario) {
        return res.status(400).json({ mensagem: "É necessário id do modulo e id do usuario!" });
    }

    db.query(atualizar, [idModulo, idUsuario], (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao atualizar o módulo!" });
        }
        return res.status(200).json({ mensagem: "Módulo iniciado com sucesso!" });
    });
};



module.exports = { cadastrar, cadastrarRelacaoUsuariosModulos, editarUsuarioModulo, selecionarUsuarioModulo, iniciarModulo, ativarUsuarioModulo, desativarUsuarioModulo, atualizarIniciado }