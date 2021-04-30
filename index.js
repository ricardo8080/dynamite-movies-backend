const express = require('express')
const morgan =  require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
//Initialization
const app = express()
require('./database')

//Settings
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('Port', process.env.PORT || 5000)

app.use(morgan('dev'))
app.use('/movie/',require('./movie/routes/movie.routes'))
app.use('/account/',require('./account-person/routes/account.routes'))

app.listen(app.get('Port'), ()=>{
    console.log('Express server on port 5000')
})
