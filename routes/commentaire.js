const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentaireCtrl = require('../controllers/commentaire');


router.get('/', auth,commentaireCtrl.getAllCommentaire);
router.post('/', auth,commentaireCtrl.createCommentaire);

module.exports = router;
