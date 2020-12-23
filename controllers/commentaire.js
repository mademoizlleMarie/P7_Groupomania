const Commentaire = require("../models/commentaire");

let  CommentaireModels  = new Commentaire();

exports.createCommentaire = (req, res, next) => {
        const commentaire = req.body;
    CommentaireModels.create(commentaire)
        .then(() => res.status(201).json({message: 'crée !'}))
        .catch((error) => {
            res.status(400).json({error})
        })
};
exports.getAllCommentaire =  (req, res, next) => {
    CommentaireModels.findAll({}).then(commentaire => {
        res.status(200).json(
            commentaire,
        )
    }).catch(
        error => res.status(400).json({error: error})
    );
};
