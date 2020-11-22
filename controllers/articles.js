const db = require("../database_connect");
const Articles = require("../models/articles");

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

};

exports.deleteArticle = (req, res, next) => {

};

exports.getOneArticle = (req, res, next) => {

};

exports.getAllArticles =  (req, res, next) => {

};

exports.likeOrDislikeArticle =  (req, res, next) => {


};

