const fs = require('fs');
const path = require('path');

let accountData = fs.readFileSync(path.join(__dirname, '/json')+'/accounts.json','utf8');
let userData = fs.readFileSync(path.join(__dirname, '/json')+'/users.json','utf8');
const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

const writeJSON = (accountsJSON)=>{
    var file = path.join(__dirname, '/json/accounts.json');
    const data = ""+accountsJSON;
    fs.writeFileSync(file, data, 'utf8');
}

module.exports = {
    accounts:accounts,
    users:users,
    writeJSON:writeJSON
}