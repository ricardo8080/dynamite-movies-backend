const mongoose = require('mongoose');
const {Schema} = mongoose;
const accountSchema = new Schema({
    username:{type: String, require :true, inmutable : true},
    password:{type: String, require :true},
    birthday:{type: String, require: true}, // YYYY-dd-mmT04:00:00.00Z 
    age:{type: Number, min:13, max:150},
    city:{type: String, require :true},
    countryResidence:{type: String, require :true},
    gender:{type: String, require :true},
    accountPicture:{type: String},
    lastMoviesSeenList:{type: [String], require :false},
    securityQuestion: {type: String, require: true},
    securityAnswer: {type: String, require: true},
    email: {type: String, require: true}
});

module.exports = mongoose.model('dynamite_accounts', accountSchema);