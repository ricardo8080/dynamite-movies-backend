const MovieCtrl = {};
const Movie = require('../models/movie');

MovieCtrl.getMovieTrends = async (req,res) => {
    let Movies = await Movie.find();
    //const quantityOfMovies = req.body.quantityRequested;
    const quantityOfMovies =  req.header('quantityOfMovies');
    if (Movies.length >= quantityOfMovies) {
        Movies = Movies.sort((a,b) => (b.searchedTimes)-(a.searchedTimes)).slice(0,quantityOfMovies-1);
    } else if(Movies.length > 0) { 
        Movies = movies.sort((a,b) => (b.searchedTimes)-(a.searchedTimes));
    } 
    res.json(Movies);
};

MovieCtrl.getAllMovies = async (req, res) => {
    let Movies = await Movie.find();
    res.json(Movies);
};

MovieCtrl.getSearchMovieList = async (req, res) => {
    let Movies = await Movie.find({"nameMovie": req.header('nameMovie')});
    res.json(Movies);
};

MovieCtrl.getSearchFliteredMovieList = async (req,res) => {
    let Movies = await Movie.find();
    Movies.filter((item) => 
        item.nameMovie.includes(req.header('nameMovie')))
        .filter((item) => 
        item.country === req.header('country'))
        .filter((item) => {
            const gendersRequested = req.header('genres');
            let hasGenders = True;
            gendersRequested.forEach(element => {
                if(!item.genres.includes(element)) {
                    hasGenders = false;
                }
            });
            return hasGenders;
        })
        .filter((item) => 
        !(typeof req.header('dateFrom') === 'undefined') &&
        !(typeof req.header('dateTo') === 'undefined') &&
        item.releaseDate >= req.header('dateFrom') &&
        item.releaseDate <= req.header('dateTo')
    )
    res.json(Movies);
};

MovieCtrl.addMovieSearchCount = async (req,res) => {
    const searchedTimes = req.body.searchedTimes + 1;
    await Movie.findOneAndUpdate(
        { "nameMovie" : req.body.nameMovie }
      , { "searchedTimes":  searchedTimes }
      )
      .then( () => {
          res.json({"response":"Succesfully Added 1 To Times this Movie was Searched"});
      })
      .catch( () => {
          res.json({"response":error});
      });
};

module.exports = MovieCtrl;
