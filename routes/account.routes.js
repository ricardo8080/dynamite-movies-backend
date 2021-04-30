const express = require('express');
const router = express.Router();
const AccountCtrl = require('../controllers/account.controllers');

router.get('/Accounts', AccountCtrl.getAccounts); //For Testing Purposes, Must erase before launch
router.post('/Check-Account-Existence', AccountCtrl.isAccountExistent);
router.post('/Sign-In', AccountCtrl.isAccountDataCorrect);
router.post('/Last-Seen', AccountCtrl.getLastSeenMovies);
router.post('/Register', AccountCtrl.createAccount);
router.put('/Forgot-Password', AccountCtrl.changePassword);
router.put('/Change-Last-Seen', AccountCtrl.changeMoviesSeen);
router.put('/Edit-Account', AccountCtrl.modifyAccountInformation);

module.exports = router;