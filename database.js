const mongoose = require('mongoose');
const URI = ('mongodb+srv://dbDynamiteAdmin:IduhrUVMCPoywdxB@cluster0.cxbun.mongodb.net/dynamitemovies?retryWrites=true&w=majority');

mongoose.connect(URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(db => console.log('Database connected'))
.catch(err => console.log(err));

module.exports = mongoose;