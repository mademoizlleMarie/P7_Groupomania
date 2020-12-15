const db = require("../database_connect");
const Articles = require("../models/articles");
const fs = require('fs');

let  ArticlesModels  = new Articles();

exports.createArticle = (req, res, next) => {
    const article = JSON.parse(req.body.article);
    article.image = req.file.filename;

    ArticlesModels.create(article)
        .then(function (response) {
            ArticlesModels.findOne(response.insertId)
        })
        .then(() => res.status(201).json({message: 'crée !'}))
        .catch((error) => {
            res.status(400).json({error})
        })
};
exports.modifyArticle = (req, res, next) => {
    const articleToModify = req.file ?
        {
            ...JSON.parse(req.body.article),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            filename: req.file.filename
        } : {...req.body};

    ArticlesModels.modify({_id: req.params.id}, {...articleToModify, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Post modifié !'}))
        .catch((error) => {
            res.status(400).json({error})
        })
};
exports.deleteArticle = (req, res, next) => {
    ArticlesModels.findOne({
        _id: req.params.id
    }).then(article => {
        const filename = article.result[0].image_article.split('/images/');
        fs.unlink(`images/${filename}`, () => {
          ArticlesModels.delete({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch((error) => {
                    res.status(400).json({error})
                })
        });
    })
};
exports.getOneArticle = (req, res, next) => {
    ArticlesModels.findOne({
        _id: req.params.id
    }).then(article => {
        console.log(article.result[0])
    }).catch(
        error => res.status(404).json({error: error})
    );
};
exports.getAllArticles =  (req, res, next) => {
    ArticlesModels.findAll({}).then(articles => {
        const mappedarticles = articles.result.map((article) => {
            article.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + article.image_article;
            return article;
        });
        res.status(200).json(
            mappedarticles,
        )
    }).catch(
        error => res.status(400).json({error: error})
    );
};



exports.createCommentaire = (req, res, next) => {
    const commentaire = JSON.parse(req.body);
console.log(commentaire);
 /*   ArticlesModels.createCommentaire(commentaire)
        .then(function (response) {
            ArticlesModels.findOne(response.insertId)
        })
        .then(() => res.status(201).json({message: 'crée !'}))
        .catch((error) => {
            res.status(400).json({error})
        })*/
};
//bonus
exports.likeOrDislikeArticle =  (req, res, next) => {

};

