const path = require('path')
const express = require('express')
const fs = require('fs')

const ejs = require('ejs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '/public')
console.log(__dirname)
const viewsPath = path.join(__dirname, '/views')
console.log(viewsPath)

app.set('view engine', 'ejs')
app.set('views', viewsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render("index",{
        title:"Index"
    })
    //res.send("hello")
})

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!')
})
