module.exports.dashboard = (req, res) => {
    res.render('Dashboard', {user: req.session.user})
}

module.exports.information = (req, res) => {
    const errorMessage = req.flash('errorMessage') || ''
    const successMessage = req.flash('successMessage') || ''

    res.render('Information', {user: req.session.user, errorMessage, successMessage})
}

module.exports.cart = (req, res) => {
    res.render('Cart')
}

module.exports.check_out = (req, res) => {
    res.render('CheckOut')
}