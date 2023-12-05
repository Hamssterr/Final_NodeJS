const express = require('express')
const Router = express.Router()

const Controller = require('../controller/Account')

Router.get('/login', Controller.login)

module.exports = Router