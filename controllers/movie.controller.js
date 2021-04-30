const MovieCtrl = {};
const Movie = require('../models/movie');

MovieCtrl.getMovieTrends = async (req,res) => {
    let Movies = await Movie.find();
    //const quantityOfMovies = req.body.quantityRequested;
    const quantityOfMovies = 5;
    if (Movies.length >= quantityOfMovies) {
        Movies = Movies.sort((a,b) => (b.searchedTimes)-(a.searchedTimes)).slice(0,quantityOfMovies-1);
    } else if(Movies.length > 0) { 
        Movies = movies.sort((a,b) => (b.searchedTimes)-(a.searchedTimes));
    } 
    res.json(Movies);
};

MovieCtrl.getSearchMovieList = async (req,res) => {
    let Movies = await Movie.find();
    Movies.filter((item) => 
        item.nameMovie.includes(req.body.nameMovie)
    );
    res.json(Movies);
};

MovieCtrl.getSearchFliteredMovieList = async (req,res) => {
    let Movies = await Movie.find();
    Movies.filter((item) => 
        item.nameMovie.includes(req.body.nameMovie)
    ).filter((item) => 
        item.country === req.body.country
    ).filter((item) => {
        const gendersRequested = req.body.gender;
        let hasGenders = True;
        gendersRequested.forEach(element => {
            if(!item.gender.includes(element)) {
                hasGenders = false;
            }
        });
        return hasGenders;
    }).filter((item) => 
        !(typeof req.body.startDate === 'undefined') &&
        !(typeof req.body.endDate === 'undefined') &&
        item.releaseDate >= req.body.startDate &&
        item.releaseDate <= req.body.endDate
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
