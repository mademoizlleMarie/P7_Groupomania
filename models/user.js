const mysql = require('mysql');
const db = require("../../../P7_Groupomania/backend/database_connect");


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

}
module.exports = UserModels;
