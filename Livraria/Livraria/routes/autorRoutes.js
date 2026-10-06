const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/AutorController');
const { autenticar, autorizar } = require('../middlewares/authMiddleware');

router.post('/', autenticar, autorizar('ADMIN'), AutorController.cadastrar);

module.exports = router;