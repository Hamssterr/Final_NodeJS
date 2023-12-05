const express = require('express')
const Router = express.Router()

const Controller = require('../controller/Product')

Router.get('/', Controller.get_all_products)

Router.get('/add', Controller.add_product)

module.exports = Router