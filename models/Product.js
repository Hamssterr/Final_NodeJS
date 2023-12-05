const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    barcode: String,
    name: String,
    import_price: Number,
    retail_price: Number,
    category: String,
    creation_date: String,
    image_url: String
})

module.exports = mongoose.model('Product', ProductSchema)

//barcode, product name, import price, retail price, category, creation date