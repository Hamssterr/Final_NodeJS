const Product = require('../models/Product')
const multer = require('multer')
const fs = require('fs');
const path = require('path');

const upload = multer({dest: 'public/Image', 
fileFilter: (req, file, callback) => {
    if(file.mimetype.startsWith('image/')) {
        callback(null, true)
    }
    else callback(null, false)
}, limits: {fileSize: 500000}}) // 500kb max

module.exports.display_products = (req, res) => {

    Product.find()
    .then(listItems => {
        res.render('Home', {listItems})
    })

}

module.exports.get_all_products = (req, res) => {

    const errorMessage = req.flash('errorMessage') || ''
    const successMessage = req.flash('successMessage') || ''

    Product.find()
    .then(listItems => {
        res.render('ManageProduct', {listItems, errorMessage, successMessage})
    })

}

module.exports.add_product = (req, res) => {

    let uploader = upload.single('image')
    uploader(req, res, err => {
        const {barcode, name, import_price, retail_price, category} = req.body

        Product.find({
            $or: [
                { barcode: barcode },
                { name: name }
            ]
        })
        .then(products => {
            if(products.length > 0) {

                let image = req.file;

                if (image) {
                    const imagePath = path.join(__dirname, '..', 'public', 'Image', image.filename);
        
                    fs.unlink(imagePath, (unlinkError) => {
                        req.flash('errorMessage', 'Barcode or name already exists')
                        res.redirect('/products')
                    });
                }
                else {
                    req.flash('errorMessage', 'Barcode or name already exists')
                    res.redirect('/products')
                }
            }
            else {
                const creation_date = new Date().toLocaleDateString();
                let url_image = undefined
        
                let image = req.file
        
                if(!image) {
                    url_image = 'default.png'
                }
                else{
                    const oldImagePath = path.join(__dirname, '..', 'public', 'Image', image.filename);
                    const newImageName = name.trim().replace(/\s+/g, '') + path.extname(image.originalname); // Keep the file extension
                    const newImagePath = path.join(__dirname, '..', 'public', 'Image', newImageName);
            
                    fs.renameSync(oldImagePath, newImagePath);
            
                    url_image = newImageName;
                }
        
                let product = new Product({
                    barcode, name, import_price, retail_price, category, creation_date, url_image
                })
        
                product.save()
                .then(() => {
                    req.flash('successMessage', 'Add product success')
                    res.redirect('/products');
                })
                .catch(e => {
                    req.flash('errorMessage', e.message)
                    res.redirect('/products')
                })
            }
        })
        .catch(error => {
            req.flash('errorMessage', 'An error has occurred')
            res.redirect('/products')
        });
    })
}

module.exports.edit_product = (req, res) => {

    let uploader = upload.single('image')
    uploader(req, res, err => {
        const {id, barcode, name, import_price, retail_price, category, url_image: old_url_image} = req.body

        Product.find({
            $or: [
                { barcode: barcode },
                { name: name }
            ]
        })
        .then(products => {
            if(products.length > 1) {
                let image = req.file;

                if (image) {
                    const imagePath = path.join(__dirname, '..', 'public', 'Image', image.filename);
        
                    fs.unlink(imagePath, (unlinkError) => {
                        req.flash('errorMessage', 'Barcode or name already exists')
                        res.redirect('/products')
                    });
                }
                else {
                    req.flash('errorMessage', 'Barcode or name already exists')
                    res.redirect('/products')
                }
            }
            else {
                const creation_date = new Date().toLocaleDateString();
                let url_image = undefined

                let image = req.file

                if(!image) {
                    const oldImagePath = path.join(__dirname, '..', 'public', 'Image', old_url_image);
                    const newImageName = name.trim().replace(/\s+/g, '') + path.extname(old_url_image); // Keep the file extension
                    const newImagePath = path.join(__dirname, '..', 'public', 'Image', newImageName);

                    fs.renameSync(oldImagePath, newImagePath);
                    url_image = newImageName;
                }
                else{
                    const oldImagePath = path.join(__dirname, '..', 'public', 'Image', image.filename);
                    const newImageName = name.trim().replace(/\s+/g, '') + path.extname(image.originalname); // Keep the file extension
                    const newImagePath = path.join(__dirname, '..', 'public', 'Image', newImageName);
            
                    fs.renameSync(oldImagePath, newImagePath);
                    url_image = newImageName;
                }

                const dataUpdate = {
                    barcode, name, import_price, retail_price, category, creation_date, url_image
                }

                Product.findByIdAndUpdate(id, dataUpdate, {
                    new: true
                })
                .then(p => {
                    if(!p) {
                        req.flash('errorMessage', 'Id not found: ' + id)
                        res.redirect('/products')
                    }
                    else {
                        req.flash('successMessage', 'Edit product success')
                        res.redirect('/products');
                    }
                })
                .catch(e => {
                    if(e.message.includes('Cast to ObjectId failed')) {
                        req.flash('errorMessage', 'Invalid Id')
                        res.redirect('/products')
                    }
                })
            }
        })
        .catch(error => {
            req.flash('errorMessage', 'An error has occurred')
            res.redirect('/products')
        });
    })
}

module.exports.delete_product = (req, res) => {
    const {id} = req.body

    if(!id) {
        req.flash('errorMessage', 'Please provide id product')
        res.redirect('/products')
    }

    Product.findByIdAndDelete(id)
    .then(p => {
        if(!p) {
            req.flash('errorMessage', 'Id not found: ' + id)
            res.redirect('/products')
        }
        else {
            const {url_image} = p
            const imagePath = path.join(__dirname, '..', 'public', 'Image', url_image);
        
            fs.unlink(imagePath, (unlinkError) => {
                req.flash('successMessage', 'Delete product success')
                res.redirect('/products');
            });
        }
    })
    .catch(e => {
        if(e.message.includes('Cast to ObjectId failed')) {
            req.flash('errorMessage', 'Invalid Id')
            res.redirect('/products')
        }
    })
}