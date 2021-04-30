const mongoose = require('mongoose')
const {Schema} = mongoose
const accountSchema = new Schema({
    username:{type: String, require :true},
    password:{type: String, require :true},
    Birthday:{type: Date, default: Date.now},
    Age:{type: Number, min:13, max:150},
    City:{type: String, require :true},
    countryResidence:{type: String, require :true},
    gender:{type: String, require :true},
    accountPicture:{type: String},
    lastMoviesSeenList:{type: [Schema.Types.ObjectId], require :true}
    //lastMoviesSeenList:{type: [String]}
})

module.exports = mongoose.model('dynamite-account', accountSchema)