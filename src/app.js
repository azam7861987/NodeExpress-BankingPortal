const fs = require('fs');
const path = require('path');

const express = require('express');
const app = new express();

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');

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
app.listen(3000, () => { console.log('PS Project Running on port 3000!') });