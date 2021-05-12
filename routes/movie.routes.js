const express = require('express');
const router = express.Router();
const MovieCtrl = require('../controllers/movie.controller');

router.get('/Trends', MovieCtrl.getMovieTrends);
router.get('/search-results', MovieCtrl.getSearchMovieList);
router.get('/search-results/filter', MovieCtrl.getSearchFliteredMovieList);
router.put('/Add-Movie-Search', MovieCtrl.addMovieSearchCount);
router.get('/movies', MovieCtrl.getAllMovies);

module.exports = router;