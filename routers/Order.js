const express = require('express')
const Router = express.Router()
const multer = require('multer')

const upload = multer({
    dest: 'public/Image/products',
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        }
        else callback(null, false)
    }, limits: { fileSize: 500000 }
})

const Controller = require('../controller/Order')
const IsLogin = require('../validators/IsLogin')

Router.post('/add', IsLogin, upload.none(), Controller.add_order)

module.exports = Router