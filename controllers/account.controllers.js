const AccountCtrl = {};
const Account = require('../models/account');

AccountCtrl.getAccounts = async (req,res) => {
    const Accounts = await Account.find();
    //console.log(Accounts);
    res.json(Accounts);
};

AccountCtrl.isAccountExistent = async (req,res) => {
    const Accounts = await Account.find({ "username" : req.body.username});
    if (Accounts.length > 0)
    {   
        res.json({"response":True});
    } 
    else {   
        res.json({"response":False});
    }
};

AccountCtrl.isAccountDataCorrect = async (req,res) => {
    let Accounts = await Account.find({ "username" : req.body.username, "password": req.body.password});
    if (Accounts.length == 0)
    {   
        Accounts = await Account.find({ "username" : req.body.username});
        if(Accounts.length == 0) {
            res.json({ "response": False,
                       "reason" :"Wrong username"});
        } else {
            res.json({ "response": False,
                       "reason" :"Wrong password"});
        }
    } else {
        res.json({ "response": True });
    }
};

AccountCtrl.getLastSeenMovies = async (req,res) => {
    const Accounts = await Account.find({ "username" : req.body.username });
    console.log(Accounts.lastMoviesSeenList);
    res.json(Accounts.lastMoviesSeenList);
};

AccountCtrl.createAccount = async (req,res) => {
    //console.log("Body:");
    //console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const birthday = req.body.Birthday;
    const age = req.body.Age;
    const city = req.body.City;
    const countryResidence = req.body.countryResidence;
    const gender = req.body.gender;
    const accountPicture = req.body.accountPicture;
    const lastMoviesSeenList = null;

    const AccountObj = new Account ({  username ,
        password ,
        birthday ,
        age ,
        city ,
        countryResidence ,
        gender ,
        accountPicture ,
        lastMoviesSeenList
    });
    try {
        await AccountObj.save();
        res.json({"response":"Succesful account Creation"});
    } catch (error) {
        res.json({"error: ": error});
    }
};

AccountCtrl.changePassword = async (req, res) =>{
    await Account.findOneAndUpdate(
          { "username" : req.body.username }
        , { "password":  req.body.password }
        )
        .then( () => {
            res.json({"response":"Succesfully changed Password"});
        })
        .catch( () => {
            res.json({"response":error});
        });
};

AccountCtrl.changeMoviesSeen = async (req, res) =>{
    await Account.findOneAndUpdate ( 
          { "username" : req.body.username }
         ,{ "lastMoviesSeenList": req.body.lastMoviesSeenList }
         )
      .then( () => {
        res.json({"response":"Succesfully changed movies seen"});
      })
      .catch( () => {
        res.json({"response":error});
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