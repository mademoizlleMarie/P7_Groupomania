const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/findOneUser', userCtrl.findOneUser);
router.put('/updateProfil', userCtrl.updateProfil);
router.put('/deleteProfil', userCtrl.deleteProfil);

module.exports = router;
