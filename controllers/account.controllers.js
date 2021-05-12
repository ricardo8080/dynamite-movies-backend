const AccountCtrl = {};
const Account = require('../models/account');

AccountCtrl.getAccounts = async (req,res) => {
    //console.log(req.header('username') + typeof (req.header('username')) );
    const Accounts = await Account.find();
    res.json(Accounts);
};
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
    const loggedAccount = await Account.find({ "username" : req.header('username') });
    console.log(loggedAccount.lastMoviesSeenList);
    if (loggedAccount.lastMoviesSeenList === null || 
        typeof loggedAccount.lastMoviesSeenList === 'undefined')
    {
        res.json(["None"])
    } else {
        res.json(loggedAccount.lastMoviesSeenList);
    }
};

AccountCtrl.isAccountAlreadyUsed = async (req,res,next) => {
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
        securityAnswer
    });
    //console.log(req.body);
    /*const SearchedAccount = await Account.find({ "username": req.header('username') });
    console.log(SearchedAccount);
    if (SearchedAccount.length > 0)
    {   
        res.json({ "response" : "Already Existent Account" });
    } 
    else*/ {   
        
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
        , { "password" :  req.body.newPassword }
        )
        .then( () => {
            console.log({ "username" : req.body.username,
            "securityQuestion" : req.body.securityQuestion ,
            "securityAnswer" : req.body.securityAnswer });
            res.json({ "response" : "Succesfully changed Password" });
        })
        .catch( () => {
            res.json({ "response" : error});
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
           "accountPicture": req.body.accountPicture
        })
        .then( () => {
            res.json({"response":"Succesfully changed Profile"});
        })
        .catch( () => {
            res.json({"response":error});
        });
};

module.exports = AccountCtrl;