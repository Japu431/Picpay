const express = require('express')
const router = express.Router();

const User = require('../models/Usuarios');
const isValidEmail = require('../models/validateEmail')

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` });
    }
})

router.post('/', async (req, res) => {

    const { nomeCompleto, CPF, senha } = req.body;

    //valida CPF


    // valida email 
    const email = req.body.email;

    const isValidEmail = (email, cb) => {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(email)) {
            // nao é um email valido, nao vale a pena perguntar se existe na DB
            cb(('RegEx: Email nao é valido'));
            return;
        }
    }

    (email, (err) => {
        if (err) {
            res.status(401).send(err.message);
            return;
        }
    });

    const user = {
        nomeCompleto, CPF, email, senha
    }


    try {
        await User.create(user);
        res.status(201).json({ message: "Usuário criado com sucesso!!" });
    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` });
    }

});

module.exports = router