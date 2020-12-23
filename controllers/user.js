const bcrypt = require('bcrypt');
const User = require("../models/user");

let  userModels  = new User();

exports.signup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    console.log(req.body)
    bcrypt.hash(password, 10)
        .then(hash => {
            let eltInsert = [email,hash,firstName,lastName];
            userModels.signup(eltInsert)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
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
exports.findOneUser = (req, res, next) => {
    userModels.findOneUser({
        _id: req.body.id_user
    }).then((response) => {
        res.status(200).json(response.result)
    }).catch(
        error => res.status(404).json({error: error})
    );
};

exports.updateProfil = (req, res, next) => {
    let id = req.body.id_user;
    let email = req.body.email;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    userModels.updateProfil(id,email,firstname,lastname)
        .then((response) => {
            res.status(200).json(response.result)
        })
        .catch(
        error => res.status(404).json({error: error})
    );
};
