const db = require("../database_connect");
const Articles = require("../models/articles");
const fs = require('fs');

let  ArticlesModels  = new Articles();

exports.createArticle = (req, res, next) => {
    const article = JSON.parse(req.body.article);
    article.image = req.file.filename;

    ArticlesModels.create(article)
        .then((response) => {
            res.status(201).json(JSON.stringify(response))
        })
        .catch((error) => {
            console.error(error);
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

};

exports.getOneArticle = (req, res, next) => {

};

exports.getAllArticles =  (req, res, next) => {

};

exports.likeOrDislikeArticle =  (req, res, next) => {


};

