const express = require('express')
const Router = express.Router()

const Controller = require('../controller/Product')

Router.get('/', Controller.get_all_products)

Router.post('/add', Controller.add_product)

Router.post('/edit', Controller.edit_product)

Router.post('/delete', Controller.delete_product)

module.exports = Router