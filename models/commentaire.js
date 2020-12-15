const mysql = require('mysql');
const db = require("../database_connect");

class CommentaireModels {
    create(eltInsert) {
        console.log(eltInsert)
        let sql = 'INSERT INTO commentaire(fk_user_id,commentaire,fk_article_id) VALUES (?,?,?)';
        sql = mysql.format(sql, Object.values(eltInsert))
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve(result,{message: 'Article bien enregistré'})
            })
        })
    }

}
module.exports = CommentaireModels;
