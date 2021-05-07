const express = require('express');
const router = express.Router();
const MovieCtrl = require('../controllers/movie.controller');

router.get('/Trends', MovieCtrl.getMovieTrends);
router.get('/Search-Results/Simple-Search', MovieCtrl.getSearchMovieList);
router.get('/Search-Results/Filter', MovieCtrl.getSearchFliteredMovieList);
router.put('/Add-Movie-Search', MovieCtrl.addMovieSearchCount);

module.exports = router;