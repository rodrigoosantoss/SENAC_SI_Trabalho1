const express = require('express');
const router = express.Router();
const userSchema = require('../models/usuario');


//criar usuário
router.post('/users', (req, res) => {
    const usuario = userSchema(req.body);
    usuario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }))
});






module.exports = router;