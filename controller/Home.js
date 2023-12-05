module.exports.index = (req, res) => {
    res.render('Home')
}

module.exports.dashboard = (req, res) => {
    res.render('Dashboard')
}

module.exports.cart = (req, res) => {
    res.render('Cart')
}

module.exports.check_out = (req, res) => {
    res.render('CheckOut')
}

module.exports.manage_account = (req, res) => {
    res.render('ManageAccount')
}

module.exports.manage_product = (req, res) => {
    res.render('ManageProduct')
}