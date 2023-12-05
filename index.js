const express = require('express')
const app = express()

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', require('./routers/Home'))

app.use('/accounts', require('./routers/Account'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})