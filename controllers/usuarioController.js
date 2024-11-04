const bCrypt = require("bcrypt");
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "1020";

const cadastrar = (req, res) => {
    const { email, senha } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;
    const procuraEmail = "SELECT email FROM usuarios WHERE email = ? ";
    const insereUsuario = "INSERT INTO usuarios (email, senha) VALUES(?, ?)";

    if (!email || !senha) {

        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).json({ mensagem: "Email invalido !" });
    }
    if (!regexSenha.test(senha)) {
        return res.status(400).json({ mensagem: "Senha invalido !" });
    }
    const senhaHash = bCrypt.hashSync(senha, 10);

    db.query(procuraEmail, [email], (err, result) => {

        if (err) return res.status(400).json({ mensagem: "Erro ao procurar email." });

        if (result.length > 0) {
            return res.status(400).json({ mensagem: "Email já existe na base de dados." });
        }

        db.query(insereUsuario, [email, senhaHash], (err) => {
            if (err) return res.status(400).send("Não foi possível inserir o usuário.");
            res.status(200).json({ mensagem: "Usuário cadastrado com sucesso." });
        });
    });
};

const login = (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {

        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }
    const sql = "SELECT email, senha FROM usuarios WHERE email = ? AND status = 1";

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao consultar o banco de dados." });

        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Email incorreto!" });
        }

        const senhaCripto = results[0].senha;
        console.log(senhaCripto);
        const senhaCorreta = await bCrypt.compare(senha, senhaCripto);
        if (senhaCorreta) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login realizado com sucesso", token });
        } else {
            return res.status(400).json({ mensagem: "Senha incorreta!" });
        }
    });
};

const editarSenha = (req, res) => {
    const { email, senha } = req.body;
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;
    if (!email || !senha) {

        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ? AND status = 1";
    const mudarSenha = "UPDATE usuarios SET senha = ? WHERE email = ?";
    if (!regexSenha.test(senha)) {
        return res.status(400).json({ mensagem: "Senha invalida" })
    }
    db.query(procuraUsuario, [email], async (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email incorreto!" });

        const senhaCripto = bCrypt.hashSync(senha, 10);
        db.query(mudarSenha, [senhaCripto, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível mudar a senha." });
            res.status(200).json({ mensagem: "Senha alterada com sucesso!" });
        });
    });
};

const editarNome = (req, res) => {
    const { email, nome } = req.body;
    if (!email || !nome) {

        return res.status(400).json({ mensagem: "Email e nome são obrigatórios" });
    }
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ? AND status = 1";
    const mudarNome = "UPDATE usuarios SET nome = ? WHERE email = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email incorreto!" });

        db.query(mudarNome, [nome, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível mudar o nome." });
            res.status(200).json({ mensagem: "Nome alterado com sucesso!" });
        });
    });
};
const editarEmail = (req, res) => {
    const { id, email } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !id) {
        return res.status(400).json({ mensagem: "Email e id são obrigatórios" });
    }
    const procuraEmail = "SELECT email FROM usuarios WHERE id = ? AND status = 1";
    const mudarEmail = "UPDATE usuarios SET email = ? WHERE id = ?";
    if (!regexEmail.test(email)) {
        return res.status(400).json("Email invalido !");
    }
    db.query(procuraEmail, [id], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagewm: "Id incorreto!" });

        db.query(mudarEmail, [email, id], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível mudar o email." });
            res.status(200).json({ mensagem: "Email alterado com sucesso!" });
        });
    });
};

const selecionarUsuario = (req, res) => {
    const { id } = req.body;
    if (!id) {

        return res.status(400).json({ mensagem: "ID obrigatório" });
    }
    const procuraUsuario = "SELECT * FROM usuarios WHERE id = ?";
    db.query(procuraUsuario, id, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao procurar usuario" });

        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Usuário não encontrado !" });
        } else {
            const usuario = {
                "email": results[0].email,
                "nome": results[0].nome
            }
            res.status(200).json(usuario);
        }

    });
}
const desativarUsuario = (req, res) => {
    const { email } = req.body;
    if (!email) {

        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ?";
    const desativarUsuario = "UPDATE usuarios SET status = ? WHERE email = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email não encontrado!" });

        db.query(desativarUsuario, [false, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível desativar usuário." });
            res.status(200).json({ mensagem: "Usuário desativado!" });
        });
    });
};

const ativarUsuario = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ?";
    const ativarUsuario = "UPDATE usuarios SET status = ? WHERE email = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email não encontrado!" });

        db.query(ativarUsuario, [true, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível ativar usuário." });
            res.status(200).json({ mensagem: "Usuário ativado!" });
        });
    });
};

const home = (req, res) => {
    res.status(200).send("Deu certo, você logou!");
};

module.exports = { cadastrar, login, editarSenha, editarNome, selecionarUsuario, editarEmail, desativarUsuario, ativarUsuario, home };
