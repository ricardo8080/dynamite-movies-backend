const MovieCtrl = {};
const Movie = require('../models/movie');

MovieCtrl.getMovieTrends = async (req,res) => {
    let Movies = await Movie.find();
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
    console.log(req.header('genres')+ typeof(req.header('genres')));
    let Movies = await Movie.find();
    Movies = Movies.filter((item) => {
            if(req.header('nameMovie') === undefined || 
               req.header('nameMovie') === null ||
               req.header('nameMovie') === '') {
                return true;
            }
            return item.nameMovie.includes(req.header('nameMovie'))
        }).filter((item) => {
            return item.country === req.header('country') || 
                  req.header('country') === undefined || 
                  req.header('country') === null ||
                  req.header('country') === ''
        }).filter((item) => {
            const gendersRequested = req.header('genres');
            let hasGenders = true;
            if(req.header('genres') === undefined || 
               req.header('genres') === null || req.header('genres') === ''){
                return true;
            } else {
                const genderSplit = gendersRequested.split(",");
                console.log(genderSplit);
                genderSplit.forEach(element => {
                    if(!item.genres.includes(element)) {
                        hasGenders = false;
                    }
                });
                return (hasGenders);
            }
        })
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

/*
    .filter((item) => {
        console.log("Searching for dateFrom dateTo");
        console.log(((req.header('dateFrom') === undefined) ||
                    (req.header('dateTo') === undefined)));

        console.log((item.releaseDate >= req.header('dateFrom') ||
                    item.releaseDate <= req.header('dateTo')));
    
        if(((req.header('dateFrom') === undefined) ||
            (req.header('dateTo') === undefined))) {
            return true;
        }

        return (
            ((item.releaseDate >= req.header('dateFrom') ||
            item.releaseDate <= req.header('dateTo'))))
    })
*/