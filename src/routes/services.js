const express = require('express')
const router = express.Router();
const data = require('../data');

const accounts = data.accounts;
const writeJSON = data.writeJSON;

router.get('/transfer',(req,res)=>{ 
    res.render("transfer",{
        title:"Transfer"       
    })
})

router.post('/transfer', function (req, res) {
    
    var amount = req.body.amount;
    let from = req.body.from;
    let to = req.body.to;
    var currentFrombalance = accounts[from].balance;
    var currentTobalance = accounts[to].balance
   
    var newBalance = parseInt(currentFrombalance) - parseInt(amount);
    var transferBalance = parseInt(currentTobalance) + parseInt(amount);
    accounts[from].balance = newBalance;
    accounts[to].balance = transferBalance;
   
    //var accountsJSON = JSON.stringify(accounts);
    const accountsJSON = JSON.stringify(accounts);
    writeJSON(accountsJSON);
    res.render("transfer",{
        message: "Transfer Completed"
    })
  })

router.get('/payment', (req, res) => {
    res.render('payment', { title: 'Payment', account: accounts.credit })
});
router.post('/payment', (req, res) => {
    var amount = req.body.amount;
    var creditBalance = accounts.credit.balance;
    accounts.credit.balance = parseInt(creditBalance)-parseInt(amount);
    accounts.credit.available = parseInt(accounts.credit.available)+ parseInt(amount);
    const accountData = JSON.stringify(accounts)
    writeJSON(accountData);
    res.render('payment', { title: 'Payment', message: "Payment Successful", account: accounts.credit })
});

module.exports=router
