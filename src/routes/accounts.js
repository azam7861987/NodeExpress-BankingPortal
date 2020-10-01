const express = require('express')
const router = express.Router();
const data = require('../data');

const accounts = data.accounts;


router.get('/savings', (req, res) => {
    let accountData = fs.readFileSync(path.join(__dirname, '/json')+'/accounts.json','utf8');
    const accounts = JSON.parse(accountData);
    res.render('account', { title: 'Account Summary', account:accounts.savings })
});

router.get('/checking', (req, res) => {
    res.render('account', { title: 'Account Summary', account:accounts.checking })
});

router.get('/credit', (req, res) => {
    res.render('account', { title: 'Account Summary', account:accounts.credit })
});

module.exports=router
