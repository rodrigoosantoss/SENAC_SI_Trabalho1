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


//buscar usuário
router.get('/users', (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }))
});

//buscar um cliente especifico 
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }))
});

//editar um cliente especifico 
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email } = req.body;
    userSchema
    .updateOne({_id: id }, { $set: { nome, sobrenome, email }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }))
});


//deletar um cliente especifico 
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }))
});


module.exports = router;