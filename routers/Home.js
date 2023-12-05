const express = require('express')
const Router = express.Router()

const Controller = require('../controller/Home')

Router.get('/', Controller.index)

Router.get('/dashboard', Controller.dashboard)

Router.get('/cart', Controller.cart)

Router.get('/check-out', Controller.check_out)

module.exports = Router