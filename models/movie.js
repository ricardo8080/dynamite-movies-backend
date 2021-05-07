const mongoose = require('mongoose');
const {Schema} = mongoose;
const movieSchema = new Schema({
    nameMovie:{type: String, require :true},
    director:{type: String, require :true},
    releaseDate:{type: Date, require :true},
    country:{type: String},
    description:{type: String, require :true},
    genres:{type: [String], require :true},
    ageRestriction:{type: Number},
    principalImage:{type: String, require :true},
    searchedTimes:{type: Number, require :true},
    listOfPictures:{type: [String]}
});

module.exports = mongoose.model('dynamite_movies', movieSchema);


