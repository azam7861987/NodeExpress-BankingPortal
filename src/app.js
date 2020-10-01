const fs = require('fs');
const path = require('path');

const express = require('express');
const app = new express();

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

let accountData = fs.readFileSync(path.join(__dirname, '/json')+'/accounts.json','utf8');
let userData = fs.readFileSync(path.join(__dirname, '/json')+'/users.json','utf8');
const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);
app.get('/', (req, res) => {  
    res.render('index', { title: 'Account Summary', accounts:accounts })
});

app.get('/savings', (req, res) => {
    let accountData = fs.readFileSync(path.join(__dirname, '/json')+'/accounts.json','utf8');
    const accounts = JSON.parse(accountData);
    res.render('account', { title: 'Account Summary', account:accounts.savings })
});

app.get('/checking', (req, res) => {
    res.render('account', { title: 'Account Summary', account:accounts.checking })
});

app.get('/credit', (req, res) => {
    res.render('account', { title: 'Account Summary', account:accounts.credit })
});

app.get('/profile',(req,res)=>{
    res.render("profile",{
        title:"Profile",
        user: users[0]       
    })
})

app.get('/transfer',(req,res)=>{ 
    res.render("transfer",{
        title:"Transfer"       
    })
})

app.post('/transfer', function (req, res) {
    
    var amount = req.body.amount;
    let from = req.body.from;
    let to = req.body.to;
    var currentFrombalance = accounts[from].balance;
    var currentTobalance = accounts[to].balance
   
    var newBalance = parseInt(currentFrombalance) - parseInt(amount);
    var transferBalance = parseInt(currentTobalance) + parseInt(amount);
    accounts[from].balance = newBalance;
    accounts[to].balance = transferBalance;
   
    let accountsJSON = JSON.stringify(accounts);
    var file = path.join(__dirname, '/json/accounts.json');
    fs.writeFileSync(file, accountsJSON, 'utf8')
    res.render("transfer",{
        message: "Transfer Completed"
    })
  })

app.get('/payment', (req, res) => {
    res.render('payment', { title: 'Payment', account: accounts.credit })
});
app.post('/payment', (req, res) => {
    var amount = req.body.amount;
    var creditBalance = accounts.credit.balance;
    accounts.credit.balance = parseInt(creditBalance)-parseInt(amount);
    accounts.credit.available = parseInt(accounts.credit.available)+ parseInt(amount);
    let accountsJSON = JSON.stringify(accounts);
   
    var file = path.join(__dirname, '/json/accounts.json');
    fs.writeFileSync(file, accountsJSON, 'utf8')
    res.render('payment', { title: 'Payment', message: "Payment Successful", account: accounts.credit })
});
app.listen(3000, () => { console.log('PS Project Running on port 3000!') });