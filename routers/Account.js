const express = require('express')
const Router = express.Router()
const multer = require('multer')

const upload = multer({
    dest: 'public/Image/avatars',
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        }
        else callback(null, false)
    }, limits: { fileSize: 500000 }
})

const Controller = require('../controller/Account')

Router.get('/login', Controller.login_UI)

Router.post('/login', Controller.login_Submit)

Router.get('/', Controller.get_all_employees)

Router.post('/add', upload.single('image'), Controller.add_employee)

Router.post('/edit', upload.single('image'), Controller.edit_employee)

Router.post('/delete', Controller.delete_employee)

Router.post('/delete-many', upload.none(), Controller.delete_many_employee)

Router.post('/lock', upload.none(), Controller.lock_employee)

Router.post('/unlock', upload.none(), Controller.unlock_employee)

Router.post('/resend-email', upload.none(), Controller.resend_email)

module.exports = Router