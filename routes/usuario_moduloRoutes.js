const express = require('express');
const { cadastrar, editarUsuarioModulo, selecionarUsuarioModulo } = require('../controllers/usuario_moduloController');
//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/cadastro', cadastrar);
router.put("/editarUsuarioModulo", editarUsuarioModulo);
router.get("/selecionarUsuariosModulos", selecionarUsuarioModulo);



module.exports = router;
