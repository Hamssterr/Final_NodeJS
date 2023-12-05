const express = require('express')
const app = express()

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('Home')
})

app.get('/dashboard', (req, res) => {
    res.render('Dashboard') 
})

app.get('/cart', (req, res) => {
    res.render('Cart') 
})

app.get('/check-out', (req, res) => {
    res.render('CheckOut') 
})

app.get('/manage-account', (req, res) => {
    res.render('ManageAccount') 
})

app.get('/manage-product', (req, res) => {
    res.render('ManageProduct') 
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})