module.exports.login_UI = (req, res) => {
    res.render('Login')
}

module.exports.login_Submit = (req, res) => {
    return res.json({message: 'Submit information to login form'})
}

module.exports.get_all_employees = (req, res) => {
    res.render('ManageAccount')
}
