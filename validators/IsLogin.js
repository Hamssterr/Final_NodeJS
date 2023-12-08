module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/accounts/login')
    }
    next()
}