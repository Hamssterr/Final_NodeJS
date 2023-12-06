const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser('ptt_nmtt_tnp'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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