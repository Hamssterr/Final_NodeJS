const express = require('express')
const Router = express.Router()

const HomeController = require('../controller/Home')
const ProductController = require('../controller/Product')

Router.get('/', ProductController.display_products)

Router.get('/dashboard', HomeController.dashboard)

Router.get('/cart', HomeController.cart)

Router.get('/check-out', HomeController.check_out)

module.exports = Router