const express = require('express')
const Router = express.Router()

const HomeController = require('../controller/Home')
const ProductController = require('../controller/Product')
const IsLogin = require('../validators/IsLogin')

Router.get('/', IsLogin, ProductController.display_products)

Router.get('/dashboard', IsLogin, HomeController.dashboard)

Router.get('/information', IsLogin, HomeController.information)

Router.get('/cart', IsLogin, HomeController.cart)

Router.get('/check-out', IsLogin, HomeController.check_out)

module.exports = Router