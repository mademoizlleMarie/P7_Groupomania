const mysql = require('mysql');
const db = require("../database_connect");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserModels {
    signup(eltInsert) {
        console.log(eltInsert);
        let sql = 'SELECT * FROM user WHERE email = ?';
        sql = mysql.format(sql, eltInsert[0]);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({err});
                if (!result[0]) {
                    let sql = 'INSERT INTO user VALUES(NULL,?, ?, ?, ?)';
                    sql = mysql.format(sql, eltInsert);
                    return new Promise((resolve, reject) => {
                        db.query(sql, function (err, result) {
                            if (err) reject({error: 'Erreur dans l\'inscription'});
                            resolve({message: 'Nouvel utilisateur !'})
                        })
                    })
                } else {
                    reject({error: 'Utilisateur déjà crée!'});
                }
            })
        })
    }
    login(email,password) {
        let sql = 'SELECT * FROM user WHERE email = ?';
        sql = mysql.format(sql, email);

        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({err});
                if (!result[0]) {
                    reject({error: 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password)
                        .then(valid => {
                            if (!valid) {
                                return reject({error: 'Mot de passe incorrect !'});
                            }
                            resolve({
                                userId: result[0].id_user,
                                token: jwt.sign(
                                    {userId: result[0].id_user},
                                    'RANDOM_TOKEN_SECRET',
                                    {expiresIn: '24h'}
                                )
                            });
                        })
                        .catch(error => reject({error}));
                }
            });
        });
    }
    findOneUser(id) {
        let sql = 'SELECT id_user, email , firstName, lastName FROM user where id_user = ?';
        sql = mysql.format(sql, id._id);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve({result})
            })
        })
    }
    updateProfil(id,email,firstName,lastName) {
        let sql = 'UPDATE user SET email = ?, firstName = ?, lastName = ? where id_user = ?';
        sql = mysql.format(sql, [email,firstName,lastName,id]);
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve({result})
            })
        })
    }

}
module.exports = UserModels;
