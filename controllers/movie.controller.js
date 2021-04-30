const MovieCtrl = {}
const Movie = require('../models/movie')

MovieCtrl.getMovieTrends = async (req,res) => {
    /**const Movies = await Movie.find()**/
    console.log(Movies)
    res.json(Movies)
}
MovieCtrl.getLastSeenMovies = async (req,res) => {
    /**const Movies = await Movie.find()**/
    console.log(Movies)
    res.json(Movies)
}
MovieCtrl.getSearchMovieList = async (req,res) => {
    /**const Movies = await Movie.find()**/
    console.log(Movies)
    res.json(Movies)
}
MovieCtrl.getSearchFliteredMovieList = async (req,res) => {
    /**const Movies = await Movie.find()**/
    console.log(Movies)
    res.json(Movies)
}
module.exports = MovieCtrl