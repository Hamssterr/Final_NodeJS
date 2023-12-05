const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/', require('./routers/Home'))
app.use('/accounts', require('./routers/Account'))
app.use('/products', require('./routers/Product'))


const PORT = process.env.PORT || 3000
const {MONGODB_URI, DB_NAME} = process.env
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME
})
.then(() => {
    app.listen(PORT, () => {
        console.log('http://localhost:' + PORT)
    })
})
.catch(e => console.log('Can not connect db server: ' + e.message))