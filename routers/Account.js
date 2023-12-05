const express = require('express')
const Router = express.Router()

const Controller = require('../controller/Account')

Router.get('/login', Controller.login_UI)

Router.post('/login', Controller.login_Submit)

Router.get('/', Controller.get_all_employees)

module.exports = Router