const express = require('express');
const morgan =  require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
//Initialization
const app = express();
require('./database');

//Settings
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.set('Port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use('/movie/',require('./routes/movie.routes'));
app.use('/account/',require('./routes/account.routes'));

app.listen(app.get('Port'), ()=>{
    console.log('Express server on port 5000');
});
