const AccountCtrl = {}
const Account = require('../models/account')

AccountCtrl.getAccounts = async (req,res) => {
    /*const Accounts = await Account.find()*/
    console.log(Accounts)
    res.json(Accounts)
}

AccountCtrl.saveAccount = async (req,res) => {
    const name = 'NodeJS'
    const lastName = 'JS'
    const PersonObj = new Account ({name,lastName})
    //await PersonObj.save()
    res.json({"response":"ok1"})
}
AccountCtrl.changePassword = async (req, res) =>{
    //await Account.findOneAndUpdate({"name":"NodeJS"},{"name":"Node","lastName":"Nice"})
    res.json({"response":"ok2"})
}
module.exports = AccountCtrl