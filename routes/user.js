const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/findOneUser', userCtrl.findOneUser);
router.post('/updateProfil', userCtrl.updateProfil);

module.exports = router;
