const bCrypt = require("bcrypt");
const db = require('../database/db');

//Verificado
//http://localhost:8079/usuario/cadastro
const cadastrar = (req, res) => {

    const { nome, email, senha } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;
    const procuraEmail = "SELECT email FROM usuario WHERE email = ? ";
    const insereUsuario = "INSERT INTO usuario (NOME, EMAIL, SENHA) VALUES(?,?,?)";

    if (!email || !senha || !nome) {
        return res.status(400).json({ mensagem: "Email, senha e nome são obrigatórios" });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).json({ mensagem: "Email invalido !" });
    }
    if (!regexSenha.test(senha)) {
        return res.status(400).json({ mensagem: "Senha deve ter 8 caracteres!" });
    }

    const senhaHash = bCrypt.hashSync(senha, 10);

    db.query(procuraEmail, [email], (err, result) => {

        if (err){
           return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." }); 
        }
        if (result.length > 0) {
            return res.status(400).json({ mensagem: "Email já existe na base de dados." });
        }

        // Banco de dados para inserir usuário
        db.query(insereUsuario, [nome, email, senhaHash], (err) => {
            if (err){
                return res.status(400).send("Não foi possível inserir o usuário.");
            }
            
            // Obtendo o ID do usuário recém-cadastrado
            db.query("SELECT id_usuario FROM usuario WHERE email = ?", [email], (err, result) => {
                if (err) {
                    return res.status(400).json({ mensagem: "Erro ao buscar ID do usuário." });
                }
                
                const idUsuario = result[0].id_usuario;

                // Obtendo todas as IDs dos módulos
                db.query("SELECT id_modulo FROM modulo", (err, results) => {
                    if (err) {
                        return res.status(400).json({ mensagem: "Erro ao buscar IDs dos módulos." });
                    }
                    
                    // Usando forEach para relacionar o usuário com todos os módulos
                    results.forEach((result) => {
                        const idModulo = result.id_modulo;
                        const insereUsuarioModulo = `INSERT INTO usuario_modulo (FK_MODULO_ID_MODULO, FK_USUARIO_ID_USUARIO) VALUES (?, ?)`;

                        db.query(insereUsuarioModulo, [idModulo, idUsuario], (err) => {
                            if (err) {
                                console.error('Erro ao inserir na tabela usuario_modulo:', err.stack);
                            }
                        });
                    });

                    res.status(200).json({ mensagem: "Usuário cadastrado com sucesso e relacionado com todos os módulos." });
                });
            });
        });
    });
};

//Verifcado
//http://localhost:8079/usuario/login
const login = (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }
    const sql = "SELECT id_usuario, nome, email, senha, admin FROM usuario WHERE EMAIL = ? AND status = 1";

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao consultar o banco de dados." });

        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Email incorreto! ou usuário se encontra desativado" });
        }

        const id_usuario = results[0].id_usuario;
        const nome = results[0].nome;
        const admin = results[0].admin;
        const senhaCripto = results[0].senha;

        console.log(senhaCripto);
        const senhaCorreta = await bCrypt.compare(senha, senhaCripto);
        if (senhaCorreta) {
            return res.status(200).json({ message: "Login realizado com sucesso", id_usuario, nome, email, admin });
        } else {
            return res.status(400).json({ mensagem: "Senha incorreta!" });
        }
    });
};


//http://localhost:8079/usuario/editarNomeEmail
const editarNomeEmail = (req, res) => {
    const { id, nome, email } = req.body;

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const editar = "UPDATE usuario SET nome = ?, email = ? WHERE id_usuario = ?";

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome ou email vazios!" });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).json({ mensagem: "Email inválido!" });
    }

    db.query(editar, [nome, email, id], (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao atualizar o banco de dados." });
        }
        return res.status(200).json({ mensagem: "Nome e E-mail alterados com sucesso!" });
    });
};

//Verificado
//http://localhost:8079/usuario/editarSenha
const editarSenha = (req, res) => {

    const { id_usuario, senhaNova } = req.body; //Recebe email, mas não é informado pelo usuario no front, pois ele poderia editar a conta de outro usuario
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;

    if (!id_usuario || !senhaNova) {
        res.status(400).json({ mensagem: "Id e senha são obrigatórios" });
        console.log(`Id do usuário que veio do reset: ${id_usuario} - ${senhaNova}`);
    }

    const mudarSenha = "UPDATE usuario SET senha = ? WHERE id_usuario = ?";

    if (!regexSenha.test(senhaNova)) {
        return res.status(400).json({ mensagem: "Senha deve ter 8 caracteres" });
    }

    const senhaCripto = bCrypt.hashSync(senhaNova, 10);
    // console.log(senhaCripto);

    db.query(mudarSenha, [senhaCripto, id_usuario], (err, results) => {
        if (err) {
             return res.status(400).json({ mensagem: "Não foi possível mudar a senha." });                
        }
        res.status(200).json({ mensagem: "Senha alterada com sucesso!" });
    });
};

//localhost:8079/usuario/selecionarUsuario
const selecionarUsuario = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ mensagem: "ID obrigatório" });
    }

    const procuraUsuario = "SELECT * FROM usuario WHERE id_usuario = ?";

    db.query(procuraUsuario, id, (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });            
        }
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Usuário não encontrado !" });
        } else {
            const usuario = {
                "email": results[0].E_MAIL,
                "nome": results[0].NOME
            }
            res.status(200).json(usuario);
        }
    });
}

//seleciona todos os usuários que estejam ativos;
//localhost:8079/usuario/selecionarUsuarios
const selecionarTodosUsuarios = (req, res) => {

    const selecionarTodos = "SELECT id_usuario, nome, email, status FROM usuario"
    
    db.query(selecionarTodos, (err, results) => {
        if (err){
           return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        } 
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Nenhum usuário foi cadastrado ainda !" });
        }

        let usuarios = results;
        
        res.status(200).json(usuarios);
    });
}

//http://localhost:8079/usuario/desativarUsuario
const desativarUsuario = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }

    const procuraUsuario = "SELECT email, status FROM usuario WHERE email = ?";
    const desativarUsuario = "UPDATE usuario SET status = ? WHERE email = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });            
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Email não encontrado!" }); 
        } 
        if (!results[0].status){
            return res.status(400).json({ mensagem: "O usuario já esta desativado" })
        }

        db.query(desativarUsuario, [false, email], (err) => {
            if (err){
                return res.status(400).json({ mensagem: "Não foi possível desativar usuário." });
            }
            res.status(200).json({ mensagem: "Usuário desativado!" });
        });
    });
};

//localhost:8079/usuario/ativarUsuario
const ativarUsuario = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }

    const procuraUsuario = "SELECT email, status FROM usuario WHERE email = ?";
    const ativarUsuario = "UPDATE usuario SET status = ? WHERE email = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });            
        }
        if (results.length === 0){
            return res.status(400).json({ mensagem: "Email não encontrado!" });
        }
        if (results[0].status){
            return res.status(400).json({ mensagem: "O usuário já esta ativado" })
        }

        db.query(ativarUsuario, [true, email], (err) => {
            if (err){
                return res.status(400).json({ mensagem: "Não foi possível ativar usuário." });
            }
            res.status(200).json({ mensagem: "Usuário ativado!" });
        });
    });
};

const mudarAdmin = (req, res) => {
    const { email } = req.body;

    if (!email){
        return res.status(400).json({mensagem: "Email é obrigatorio"});
    }

    const consultarAdmin = "SELECT admin FROM usuario WHERE email = ?";
    const alterarAdmin = "UPDATE usuario SET admin = ? WHERE email = ?";

    db.query(consultarAdmin, [email], (err, results) => {
        if (err){
            return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados" });
        }
        if (results.length === 0){
            return res.status(400).json({mensagem: "Email não encontrado!"});
        }
        
        const admin = results[0].admin;

        if(admin == 1){
            db.query(alterarAdmin, [0, email], (err, results) => {
                return res.status(200).json({ mensagem: "Usuario perdeu permissão de administrador"});
            });
        }if (admin == 0) {
            db.query(alterarAdmin, [1, email], (err, results) => {
                return res.status(200).json({ mensagem: "Usuario ganhou permissão de administrador"});
            })
        }
    });
}

module.exports = { cadastrar, login, editarNomeEmail, editarSenha, selecionarUsuario, selecionarTodosUsuarios, desativarUsuario, ativarUsuario, mudarAdmin };

//Criar edit geral