const db = require('../database/db');

//localhost:8079/usuarioModulo/cadastro
const cadastrar = (req, res) => {

    const { idModulo, idUsuario } = req.body;

    const inserir = "INSERT INTO usuario_modulo (fk_modulo_id_modulo, fk_usuario_id_usuario) VALUES (?,?)"

    if (!idModulo){
        return res.status(400).json({ mensagem: "É necessário id do modulo" });
    } 
    if (!idUsuario){
        return res.status(400).json({ mensagem: "É necessário id do usuário " });
    } 

    db.query(inserir, [idModulo, idUsuario], (err, results) => {
        if (err){
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

    const { aprovado, iniciado, nota_final, id } = req.body;
    

    const editar = "UPDATE usuario_modulo SET aprovado = ?, iniciado = ?, nota_final = ? WHERE id_usuario_modulo = ?";
     
    if (!id){
        return res.status(400).json({ mensagem: "É necessário id do modulo" });
    } 

    db.query(editar, [ aprovado, iniciado, nota_final, id ], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco !" });
        }
        return res.status(200).json({ mensagem: "usuario_modulo editado com sucesso !" });
    });
}

//localhost:8079/usuarioModulo/selecionarUsuariosModulos
const selecionarUsuarioModulo = (req, res) => {
    const selecionar = `
      SELECT 
        usuario_modulo.ID_USUARIO_MODULO AS id_usuario_modulo,
        usuario_modulo.STATUS AS status,
        usuario_modulo.APROVADO AS aprovado,
        usuario_modulo.INICIADO AS iniciado,
        usuario_modulo.NOTA_FINAL AS nota_final,
        usuario_modulo.FK_MODULO_ID_MODULO AS fk_modulo_id_modulo,
        usuario.NOME AS nome_usuario,
        modulo.NOME AS nome_modulo
      FROM 
        USUARIO_MODULO usuario_modulo
      INNER JOIN 
        USUARIO usuario ON usuario_modulo.FK_USUARIO_ID_USUARIO = usuario.ID_USUARIO
      INNER JOIN 
        MODULO modulo ON usuario_modulo.FK_MODULO_ID_MODULO = modulo.ID_MODULO
      ORDER BY 
        usuario_modulo.ID_USUARIO_MODULO ASC; -- Ordena pelos IDs em ordem crescente
    `;
  
    db.query(selecionar, (err, results) => {
      if (err) {
        return res.status(400).json({ mensagem: "Erro ao consultar o banco!" });
      }
      if (results.length === 0) {
        return res.status(400).json({ mensagem: "Não há dados na tabela!" });
      }
  
      return res.status(200).json(results);
    });
  };
  
  module.exports = { selecionarUsuarioModulo };
  

//localhost:8079/usuarioModulo/iniciarModulo
const iniciarModulo = (req, res) => {

    const { id } = req.body;

    const verificar = "SELECT * FROM usuario_modulo WHERE id_usuario_modulo = ? AND status = ?";
    const iniciar = "UPDATE usuario_modulo SET iniciado = true WHERE id_usuario_modulo = ?";

    db.query(verificar, [id, true], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco" });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Não há registros" });
        } 

        db.query(iniciar, [id], (err, results) => {
            if (err){
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
        if (err){
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

//http://localhost:3000/usuarioModulo/listarModulosPorUsuario
const listarModulosPorUsuario = (req, res) => {
    const { idUsuario } = req.query;

    if (!idUsuario) {
        return res.status(400).json({ mensagem: "É necessário fornecer o id do usuário." });
    }

    const query = `
        SELECT m.id_modulo, m.nome, m.porcentagem_necessaria, m.status
        FROM usuario_modulo um
        JOIN modulo m ON um.fk_modulo_id_modulo = m.id_modulo
        WHERE um.fk_usuario_id_usuario = ?
            AND um.status = 1
            AND um.aprovado = 0
            AND m.status = 1
    `;

    db.query(query, [idUsuario], (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao buscar os módulos.", erro: err });
        }

        res.status(200).json(results);
    });
};

// http://localhost:3000/usuarioModulo/verificarAprovacao
const verificarAprovacao = (req, res) => {
    const { idUsuario } = req.query;

    if (!idUsuario) {
        return res.status(400).json({ mensagem: "É necessário fornecer o id do usuário." });
    }

    const query = `
        SELECT COUNT(*) AS total, 
               SUM(CASE WHEN aprovado = 1 THEN 1 ELSE 0 END) AS aprovados
        FROM usuario_modulo
        WHERE fk_usuario_id_usuario = ?
    `;

    db.query(query, [idUsuario], (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao verificar aprovação.", erro: err });
        }

        const { total, aprovados } = results[0];
        
        if (total === 0) {
            return res.status(404).json({ mensagem: "Nenhum vínculo encontrado para o usuário." });
        }

        const todosAprovados = total === aprovados;

        res.status(200).json({ status: todosAprovados ? 1 : 0 });
    });
};

const definirNotaAprovado = (req, res) => {
    
    const { nota_final, idUsuario, idModulo } = req.body;

    const sql = "UPDATE USUARIO_MODULO SET APROVADO = true, NOTA_FINAL = ? WHERE FK_USUARIO_ID_USUARIO = ? AND FK_MODULO_ID_MODULO = ?";

    db.query(sql, [nota_final, idUsuario, idModulo], (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar a nota!' });
        }
        return res.status(200).json({ mensagem: 'Dados atualizados com sucesso!' });
    });
};

const definirNota = (req, res) => {
    const { nota_final, idUsuario, idModulo } = req.body;

    const sql = "UPDATE USUARIO_MODULO SET NOTA_FINAL = ? WHERE FK_USUARIO_ID_USUARIO = ? AND FK_MODULO_ID_MODULO = ?";

    db.query(sql, [nota_final, idUsuario, idModulo], (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar a nota!' });
        }
        return res.status(200).json({ mensagem: 'Dados atualizados com sucesso!' });
    });
}

module.exports = { cadastrar, cadastrarRelacaoUsuariosModulos, editarUsuarioModulo, selecionarUsuarioModulo, iniciarModulo, ativarUsuarioModulo, desativarUsuarioModulo, atualizarIniciado, listarModulosPorUsuario, verificarAprovacao, definirNotaAprovado, definirNota }