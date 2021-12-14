const mongoose = require("mongoose");

const isValidEmail = (email, cb) => {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(email)) {
        // nao é um email valido, nao vale a pena perguntar se existe na DB
        cb(new Error('RegEx: Email nao é valido'));
        return;
    }

    mongoose.connect((err, db) => {
        db.collection('users').findOne({email: value}, (err, res) => {
            if (res && res.email === value) { 
                // email existe na base de dados
                cb(new Error('DB: Email existente'));
            } else {
                cb(null); // OK
            }
        })
    });    
}

module.exports = isValidEmail;


