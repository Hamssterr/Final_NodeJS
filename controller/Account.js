const Account = require('../models/Account')
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const validator = require('../validators/Account')

const upload = multer({
    dest: 'public/Image/avatars',
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        }
        else callback(null, false)
    }, limits: { fileSize: 500000 }
}) // 500kb max

module.exports.login_UI = (req, res) => {
    res.render('Login')
}

module.exports.login_Submit = (req, res) => {
    return res.json({message: 'Submit information to login form'})
}

module.exports.get_all_employees = (req, res) => {
    const errorMessage = req.flash('errorMessage') || ''
    const successMessage = req.flash('successMessage') || ''

    Account.find()
        .then(listEmployees => {
            res.render('ManageAccount', { listEmployees, errorMessage, successMessage })
        })
}

module.exports.add_employee = (req, res) => {

    let uploader = upload.single('image')
    uploader(req, res, err => {
        const { fullname, email, phone} = req.body
        let image = req.file

        const error = validator(fullname, email, phone)
        if(error !== '') {
            if (image) {
                const imagePath = path.join(__dirname, '..', 'public', 'Image', 'avatars', image.filename);
                fs.unlinkSync(imagePath)
            }

            return res.json({error: error})
        }

        const username = email.split('@')[0];
        const password = username
        const role = 'employee'
        const isActive = false
        const status = 'unlock'

        let url_avatar = undefined
        let oldImagePath = undefined
        let newImageName = undefined
        let newImagePath = undefined

        if (!image) {
            url_avatar = 'avatar_default.png'
        }
        else {
            oldImagePath = path.join(__dirname, '..', 'public', 'Image', 'avatars', image.filename);
            newImageName = username.trim().replace(/\s+/g, '') + path.extname(image.originalname);
            newImagePath = path.join(__dirname, '..', 'public', 'Image', 'avatars', newImageName);

            url_avatar = newImageName;
        }

        const hashed = bcrypt.hashSync(password, 5)

        let account = new Account({
            fullname, email, username, password: hashed, phone, role, isActive, status, url_avatar
        })

        account.save()
            .then(() => {
                if (image) {
                    fs.renameSync(oldImagePath, newImagePath);
                }

                req.flash('successMessage', 'Add employee success')
                res.redirect('/accounts');
            })
            .catch(e => {
                if (image) {
                    const imagePath = path.join(__dirname, '..', 'public', 'Image', 'avatars', image.filename);
                    fs.unlinkSync(imagePath)
                }

                if (e.message.includes('fullname')) {
                    req.flash('errorMessage', 'Full name already exists')
                }
                else if (e.message.includes('email')) {
                    req.flash('errorMessage', 'Email already exists')
                }
                else if (e.message.includes('username')) {
                    req.flash('errorMessage', 'User name already exists')
                }
                else {
                    req.flash('errorMessage', 'Add fail, an error has occurred')
                }
                res.redirect('/accounts')
            })
    })
}
