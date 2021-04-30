const mongoose = require('mongoose');
const {Schema} = mongoose;
const accountSchema = new Schema({
    username:{type: String, require :true},
    password:{type: String, require :true},
    birthday:{type: String, require: true}, // DD/MM/YYYY 
    age:{type: Number, min:13, max:150},
    city:{type: String, require :true},
    countryResidence:{type: String, require :true},
    gender:{type: String, require :true},
    accountPicture:{type: String},
    lastMoviesSeenList:{type: [Schema.ObjectId], require :false}
});

module.exports = mongoose.model('dynamite_accounts', accountSchema);