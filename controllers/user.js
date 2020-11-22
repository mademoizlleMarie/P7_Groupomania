const bcrypt = require('bcrypt');
const User = require("../models/user");

let  userModels  = new User();

exports.signup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then(hash => {
            let eltInsert = [email,hash,firstName,lastName];
            userModels.signup(eltInsert)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    userModels.login(email,password)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
};
