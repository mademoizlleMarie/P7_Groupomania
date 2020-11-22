const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const articlesCtrl = require('../controllers/articles');

router.get('/', auth, articlesCtrl.getAllArticles);
router.post('/', auth,multer, articlesCtrl.createArticle);
router.get('/:id', auth, articlesCtrl.getOneArticle);
router.put('/:id', auth, multer, articlesCtrl.modifyArticle);
router.delete('/:id', auth, articlesCtrl.deleteArticle);
router.post('/:id/like', auth, articlesCtrl.likeOrDislikeArticle);

module.exports = router;
