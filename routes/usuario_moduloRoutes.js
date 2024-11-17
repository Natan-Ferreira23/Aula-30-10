const express = require('express');
const { cadastrar, editarUsuarioModulo, selecionarUsuarioModulo, iniciarModulo } = require('../controllers/usuario_moduloController');
//const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/cadastro', cadastrar);
router.put("/editarUsuarioModulo", editarUsuarioModulo);
router.get("/selecionarUsuariosModulos", selecionarUsuarioModulo);
router.put("/iniciarModulo", iniciarModulo);



module.exports = router;
