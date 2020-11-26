const mysql = require('mysql');
const db = require("../database_connect");

class ArticlesModels {
    create(eltInsert) {
        let sql = 'INSERT INTO article(fk_id_user,titre_article,corps_article,image_article,date_article) VALUES (?,?,?,?,NOW())';
        sql = mysql.format(sql, Object.values(eltInsert))
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve({message: 'Article bien enregistré'})
            })
        })
    }

    modify(id, body) {
        let sql1 = 'SELECT * FROM article where id_article = ?';
        sql1 = mysql.format(sql1, id._id);
        return new Promise((resolve) => {
            db.query(sql1, function (err, result) {
                if (err) throw err;
                if (body.userId == result[0].fk_id_user && body.filename == result[0].image_article) {
                    let sql2 = 'UPDATE article SET titre_article = ?, corps_article = ? WHERE id_article = ? AND fk_id_user = ?';
                    sql2 = mysql.format(sql2, [body.titre, body.corps, body._id, body.userId]);
                    db.query(sql2, function (err, result, fields) {
                        if (err) throw err;
                        resolve({message: 'Post modifié !'});
                    })
                } else if (body.userId == result[0].fk_id_user && body.filename != result[0].image_article) {
                    let sql3 = 'UPDATE article SET titre_article = ?, corps_article = ?, image_article = ?  WHERE id_article = ? AND fk_id_user = ?';
                    sql3 = mysql.format(sql3, [body.titre, body.corps,body.filename, body._id, body.userId]);
                    db.query(sql3, function (err, result, fields) {
                        if (err) throw err;
                        resolve({message: 'Post et image modifiés !'});
                    })
                } else {
                    reject({error: 'fonction indisponible'});
                }
            })
        });
    }

    findOne(id) {
        let sql = 'SELECT * FROM article where id_article = ?';
        sql = mysql.format(sql, id._id);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve({result})
            })
        })
    }


}
module.exports = ArticlesModels;
