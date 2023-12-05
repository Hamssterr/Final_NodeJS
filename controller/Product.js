const Product = require('../models/Product')

module.exports.get_all_products = (req, res) => {
    res.render('ManageProduct')
}

module.exports.add_product = (req, res) => {
    const barcode = 'A001'
    const name = 'iPhone 6S'
    const import_price = 1000
    const retail_price = 1100
    const category = 'iPhone'
    const creation_date = new Date().toLocaleDateString();
    const image_url = 'Image/iPhone6s.png'

    let product = new Product({
        barcode, name, import_price, retail_price, category, creation_date, image_url
    })

    product.save()
    .then(() => {
        return res.json({code: 0, message: 'Add product success', data: product})
    })
    .catch(e => {
        return res.json({code: 2, message: e.message})
    })
}