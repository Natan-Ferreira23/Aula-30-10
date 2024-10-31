const bCrypt = require("bcrypt");
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const cadastrar = (req, res) => {
    const { email, senha } = req.body;
    const procuraEmail = "SELECT email FROM usuarios WHERE email = ? ";
    const insereUsuario = "INSERT INTO usuarios (email, senha) VALUES(?, ?)";

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios!");
    }

    const senhaHash = bCrypt.hashSync(senha, 10);

    db.query(procuraEmail, [email], (err, result) => {
        if (err) return res.status(400).send("Erro ao procurar email.");
        
        if (result.length > 0) {
            return res.status(400).send("Email já existe na base de dados.");
        } 

        db.query(insereUsuario, [email, senhaHash], (err) => {
            if (err) return res.status(400).send("Não foi possível inserir o usuário.");
            res.status(200).send("Usuário cadastrado com sucesso.");
        });
    });
};

const login = (req, res) => {
    const { email, senha } = req.body;
    const sql = "SELECT email, senha FROM usuarios WHERE email = ? AND status = 1";

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).send("Erro ao consultar o banco de dados.");

        if (results.length === 0) {
            return res.status(400).send("Email incorreto!");
        }

        const senhaCripto = results[0].senha;

        const senhaCorreta = await bCrypt.compare(senha, senhaCripto);
        if (senhaCorreta) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login realizado com sucesso", token });
        } else {
            return res.status(400).send("Senha incorreta!");
        }
    });
};

const editarSenha = (req, res) => {
    const { email, senha } = req.body;
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ? AND status = 1";
    const mudarSenha = "UPDATE usuarios SET senha = ? WHERE email = ?";

    db.query(procuraUsuario, [email], async (err, results) => {
        if (err) return res.status(400).send("Erro ao consultar o banco de dados.");
        if (results.length === 0) return res.status(400).send("Email incorreto!");

        const senhaCripto = bCrypt.hashSync(senha, 10);
        db.query(mudarSenha, [senhaCripto, email], (err) => {
            if (err) return res.status(400).send("Não foi possível mudar a senha.");
            res.status(200).send("Senha alterada com sucesso!");
        });
    });
};

const editarNome = (req, res) => {
    const { email, nome } = req.body;
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ? AND status = 1";
    const mudarNome = "UPDATE usuarios SET nome = ? WHERE email = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).send("Erro ao consultar o banco de dados.");
        if (results.length === 0) return res.status(400).send("Email incorreto!");

        db.query(mudarNome, [nome, email], (err) => {
            if (err) return res.status(400).send("Não foi possível mudar o nome.");
            res.status(200).send("Nome alterado com sucesso!");
        });
    });
};

const desativarUsuario = (req, res) => {
    const { email } = req.body;
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ?";
    const desativarUsuario = "UPDATE usuarios SET status = ? WHERE email = ?";
    
    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).send("Erro ao consultar o banco de dados.");
        if (results.length === 0) return res.status(400).send("Email não encontrado!");

        db.query(desativarUsuario, [false, email], (err) => {
            if (err) return res.status(400).send("Não foi possível desativar usuário.");
            res.status(200).send("Usuário desativado!");
        });
    });
};

const ativarUsuario = (req, res) => {
    const { email } = req.body;
    const procuraUsuario = "SELECT email FROM usuarios WHERE email = ?";
    const ativarUsuario = "UPDATE usuarios SET status = ? WHERE email = ?";
    
    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).send("Erro ao consultar o banco de dados.");
        if (results.length === 0) return res.status(400).send("Email não encontrado!");

        db.query(ativarUsuario, [true, email], (err) => {
            if (err) return res.status(400).send("Não foi possível ativar usuário.");
            res.status(200).send("Usuário ativado!");
        });
    });
};

const home = (req, res) => {
    res.status(200).send("Deu certo, você logou!");
};

module.exports = { cadastrar, login, editarSenha, editarNome, desativarUsuario, ativarUsuario, home };
