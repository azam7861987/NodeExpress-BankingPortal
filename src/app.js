const fs = require('fs');
const path = require('path');
const data = require('./data');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');


const express = require('express');
const app = new express();

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));
app.use("/account",accountRoutes);
app.use("/services",servicesRoutes);

const accounts = data.accounts;
const users = data.users;
const writeJSON = data.writeJSON;
app.get('/', (req, res) => {  
    res.render('index', { title: 'Account Summary', accounts:accounts })
});


app.get('/profile',(req,res)=>{
    res.render("profile",{
        title:"Profile",
        user: users[0]       
    })
})



app.listen(3000, () => { console.log('PS Project Running on port 3000!') });