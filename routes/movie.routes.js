const express = require('express');
const router = express.Router();
const MovieCtrl = require('../controllers/movie.controller');

router.get('/Trends', MovieCtrl.getMovieTrends);
router.post('/Search-Results/Simple-Search', MovieCtrl.getSearchMovieList);
router.post('/Search-Results/Filter', MovieCtrl.getSearchFliteredMovieList);
router.put('/Add-Movie-Search', MovieCtrl.addMovieSearchCount);

module.exports = router;