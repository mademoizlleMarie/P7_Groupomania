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
    findAll() {
        let sql = 'SELECT * FROM commentaire';
        sql = mysql.format(sql);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve({result})
            })
        })
    }
    findByArticleId(idArticle){
        let sql = 'SELECT * FROM commentaire join user on user.id_user = commentaire.fk_user_id where fk_article_id = ? ';
        sql = mysql.format(sql,[idArticle]);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve(result)
            })
        }).then((result)=>{
            return result
        })
    }
    delete(idArticle){
        let sql = 'DELETE FROM commentaire WHERE fk_article_id = ? ';
        sql = mysql.format(sql,idArticle._id);
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve(result)
            })
        }).then((result)=>{
            return result
        })
    }
}
module.exports = CommentaireModels;
