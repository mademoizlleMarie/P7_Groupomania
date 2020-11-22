const mysql = require('mysql');
const db = require("../database_connect");


class ArticlesModels {
        create(eltInsert) {
        let sql = 'INSERT INTO article(fk_id_user,titre_article,corps_article,image_article,date_article) VALUES (?,?,?,?,NOW())';
        sql = mysql.format(sql,Object.values(eltInsert))
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) reject({error: err});
                resolve({message: 'Article bien enregistré'})
            })
        })
    }
}
module.exports = ArticlesModels;
