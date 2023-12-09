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

const Controller = require('../controller/Cart')
const IsLogin = require('../validators/IsLogin')

Router.post('/add', IsLogin, upload.none(), Controller.add_cart)

Router.get('/', IsLogin, Controller.get_cart)

Router.post('/delete', IsLogin, upload.none(), Controller.delete_cart)

module.exports = Router