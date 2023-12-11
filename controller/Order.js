const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const DetailsOrder = require('../models/DetailsOrder')

module.exports.add_order = (req, res) => {
    
    const {customerPhone, totalQuantity, totalPrice, customerName, customerAddress, received, refunds, firstPayment} = req.body
    const name = customerName
    const phone = customerPhone
    const address = customerAddress
    const employeeName = req.session.user.fullname
    const creation_date = new Date().toLocaleDateString();

    Customer.findOne({phone: phone}).then(customer => {
        if(!customer) {
            let newCustomer = new Customer({
                name, phone, address
            })
            newCustomer.save()
        }
    })
    .catch(e => {
        console.log('Search customer failed')
    });

    //order
    let order = new Order({
        employeeName, customerPhone, customerName, customerAddress, totalQuantity, totalPrice, received, refunds, creation_date
    })
    order.save()
        .then(() => {
            const orderId = order._id

            Cart.find({ employeeName })
            .then(carts => {
                if(carts.length === 0) {
                    return res.json({ code: 0, message: 'Payment success' })
                }

                let detailsOrder = undefined
                let productBarcode = undefined
                let productName = undefined
                let price = undefined
                let quantity = undefined
                let totalPrice_ = undefined

                const savePromises = []

                carts.forEach(cart => {
                    productBarcode = cart.productBarcode
                    productName = cart.productName
                    price = cart.price
                    quantity = cart.quantity
                    totalPrice_ = cart.totalPrice

                    const promise = new Promise((resolve, reject) => {

                        detailsOrder = new DetailsOrder({
                            orderId, productBarcode, productName, price, quantity, totalPrice: totalPrice_
                        })
                
                        detailsOrder.save()
                            .then(() => {
                                resolve();
                            })
                            .catch(e => {
                                reject(e);
                            });
                    });

                    savePromises.push(promise);
                })

                Promise.all(savePromises)
                    .then(() => {

                        //delete cart
                        Cart.deleteMany({ employeeName: employeeName })
                            .then(result => {
                                req.session.user.recentOrder = order
                                return res.json({ code: 0, message: 'Payment success' });
                            })
                            .catch(e => {
                                return res.json({ code: 2, message: 'Clean cart failed' });
                            });
                    })
                    .catch(e => {
                        return res.json({ code: 2, message: 'Create all details order failed'});
                    });
            })
            .catch(e => {
                return res.json({ code: 2, message: 'Find cart failed' })
            })
        })
        .catch(e => {
            return res.json({ code: 2, message: 'Create order failed' })
        })
}

module.exports.history_customer = (req, res) => {
    const {customerPhone} = req.body
    return res.json({code: 0, message: 'Phone = ' + customerPhone})
}