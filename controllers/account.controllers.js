const AccountCtrl = {};
const Account = require('../models/account');


AccountCtrl.isAccountExistent = async (req,res) => {
    const SearchedAccount = await Account.find(
        { "username": req.header('username') });
    if (SearchedAccount.length > 0)
    {   
        res.json({ "response" : "True" });
    } 
    else {   
        res.json({ "response" : "False" });
    }
};

AccountCtrl.getAccountInformation = async (req,res) => {
    const SearchedAccount = await Account.find({ "username": req.header('username') });
    res.json(SearchedAccount);
};

AccountCtrl.isSignInAllowed = async (req,res,next) => {
    const loggedAccount = await Account.find( 
        { "username" : req.header('username') ,
          "password": req.header('password') }); //temporal way to pass password
    if (loggedAccount.length == 0)
    {   
        next();
    } else {
        res.json({ "response" : "True" });
    }
};
AccountCtrl.checkWhichDataIsWrong = async (req,res) => {
    const failAccountLogin = await Account.find({ "username" : req.header('username')});
    if(failAccountLogin.length == 0) {
        res.json({ "response" : "False" ,
                    "reason" : "Wrong username" });
    } else {
        res.json({ "response" : "False" ,
                    "reason" :"Wrong password" });
    }
};
AccountCtrl.getLastSeenMovies = async (req,res) => {
    const loggedAccount = await Account.find({ "username" : req.header('username') });    if (loggedAccount.lastMoviesSeenList === null || 
        typeof loggedAccount.lastMoviesSeenList === 'undefined')
    {
        res.json(["None"]);
    } else {
        res.json(loggedAccount.lastMoviesSeenList);
    }
};
AccountCtrl.createAccount = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const birthday = req.body.birthday;
    const age = req.body.age;
    const city = req.body.city;
    const countryResidence = req.body.countryResidence;
    const gender = req.body.gender;
    const accountPicture = req.body.accountPicture;
    const lastMoviesSeenList = null;
    const securityQuestion = req.body.securityQuestion;
    const securityAnswer = req.body.securityAnswer;
    const email = req.body.email;
    const AccountObj = new Account ({  
        username ,
        password ,
        birthday ,
        age ,
        city ,
        countryResidence ,
        gender ,
        accountPicture ,
        lastMoviesSeenList,
        securityQuestion,
        securityAnswer,
        email
    });
    console.log(AccountObj);
    const SearchedAccount = await Account.find({ "username": username });
    if (SearchedAccount.length > 0)
    {   
        res.json({ "response" : "Already Existent Account" });
    } else {
        try {
            await AccountObj.save();
            res.json({ "response" : "Succesful account Creation" });
        } catch (error) {
            res.json({ "error: " : error});
        }
    }
};
AccountCtrl.changePassword = async (req, res) =>{    
    await Account.findOneAndUpdate(
          { "username" : req.body.username,
            "securityQuestion" : req.body.securityQuestion ,
            "securityAnswer" : req.body.securityAnswer }
        , { "password" :  req.body.newPassword}, function (err, result) {
            if (err) 
            {
                res.send(err);
            } else {
                res.send(result);
            }
         });
};
AccountCtrl.changeMoviesSeen = async (req, res) =>{
    await Account.findOneAndUpdate ( 
          { "username" : req.body.username }
         ,{ "lastMoviesSeenList" : req.body.lastMoviesSeenList }
         )
      .then( () => {
        res.json({ "response" : "Succesfully changed movies seen" });
      })
      .catch( () => {
        res.json({ "esponse" : error });
      });
};

AccountCtrl.modifyAccountInformation = async (req, res) =>{
    await Account.findOneAndUpdate(
        { "username" : req.body.username }
        ,{ "birthday": req.body.birthday,
           "age": req.body.age,
           "city": req.body.city,
           "countryResidence": req.body.countryResidence,
           "gender": req.body.gender,
           "accountPicture": req.body.accountPicture,
           "securityQuestion": req.body.securityQuestion,
           "securityAnswer": req.body.securityAnswer,
           "email": req.body.email
        })
        .then( () => {
            res.json({"response":"Succesfully changed Profile"});
        })
        .catch( () => {
            res.json({"response":error});
        });
};

function areAllValuesRight(req) {
    if (req.body.password === null || 
        typeof req.body.password !== 'string') {
        return false;
    }
    if (req.body.birthday === null || 
        typeof req.body.birthday !== 'string') {
        return false;
    }
    if (req.body.age === null || 
        parseInt(req.body.age) > 150 ||
        parseInt(req.body.age) < 13 ) {
        return false;
    }
    if (req.body.city === null || 
        typeof req.body.city !== 'string') {
        return false;
    }
    if (req.body.countryResidence === null || 
        typeof req.body.countryResidence !== 'string') {
        return false;
    }
    if (req.body.gender === null || 
        typeof req.body.gender !== 'string') {
        return false;
    }
    if (req.body.securityQuestion === null || 
        typeof req.body.securityQuestion !== 'string') {
        return false;
    }
    if (req.body.securityAnswer === null || 
        typeof req.body.securityAnswer !== 'string') {
        return false;
    }
    return true;
}

module.exports = AccountCtrl;