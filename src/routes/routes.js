const express = require('express')
const router = express.Router();

const User = require('../models/Usuarios');


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

    const { nomeCompleto, CPF, email, senha } = req.body;

    const user = {
        nomeCompleto, CPF, email, senha
    }

    //valida CPF

    var Soma;
    var Resto;
    Soma = 0;

    if (user.CPF == "00000000000") 
    return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(user.CPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(user.CPF.substring(9, 10))) 
    return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(user.CPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(user.CPF.substring(10, 11))) 
    return false;

    // valida email 

    


    try {
        await User.create(user);
        res.status(201).json({ message: "Usuário criado com sucesso!!" });
    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` });
    }

})

module.exports = router