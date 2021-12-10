const mongoose = require('mongoose');

const User = mongoose.model('User' , {
    nomeCompleto: String,
    CPF: String , 
    email: String ,
    senha: String ,
})

module.exports = User;