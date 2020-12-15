const Commentaire = require("../models/commentaire");

let  CommentaireModels  = new Commentaire();

exports.createCommentaire = (req, res, next) => {
        const commentaire = req.body;
        console.log(commentaire);
    CommentaireModels.create(commentaire)
        .then(() => res.status(201).json({message: 'crée !'}))
        .catch((error) => {
            res.status(400).json({error})
        })
};
