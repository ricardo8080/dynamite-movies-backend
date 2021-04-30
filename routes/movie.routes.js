const express = require('express')
const router = express.Router()
const MovieCtrl = require('../controllers/movie.controller')

router.get('/Main-Page/Last-Seen', PersonCtrl.getLastSeenMovies)
router.get('/Main-Page/Trends', PersonCtrl.getMovieTrends)
router.get('/Search-Results/Simple-Search', PersonCtrl.getSearchMovieList)
router.get('/Search-Results/Filter', PersonCtrl.getSearchFliteredMovieList)
module.exports = router