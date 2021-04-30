const express = require('express')
const router = express.Router()
const AccountCtrl = require('../controllers/account.controllers')

router.get('/', AccountCtrl.getAccounts)
router.post('/Register', AccountCtrl.saveAccount)
router.put('/Forgot-Password', AccountCtrl.changePassword)
router.put('/Change-Last-Seen', AccountCtrl.changeMoviesSeen)
//router.put('/Edit-Account', AccountCtrl.modifyAccountInformation)

module.exports = router