const mysql = require('mysql');
const db = require("../database_connect");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserModels {
    signup(eltInsert) {
        let sql = 'SELECT * FROM user WHERE email = ?';
        sql = mysql.format(sql, eltInsert[0]);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({err});
                console.log(result[0]);
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
               console.log(result[0]);
                if (!result[0]) {
                    reject({error: 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password)
                        .then(valid => {
                            if (!valid) {
                                return reject({error: 'Mot de passe incorrect !'});
                            }
                            resolve({
                                userId: result[0].id,
                                token: jwt.sign(
                                    {userId: result[0].id},
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
}
module.exports = UserModels;
