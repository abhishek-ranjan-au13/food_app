const path = require('path');
const MenuSchema = require('../../../modals/menuSchema')

const layout = path.join('layouts')

const CartControler = {
    async get(req, res) {
        try {
            if (req.session.cart) {
                let data = []
                for (let item of Object.values(req.session.cart.item)) {
                    data.push(item)
                }
                return res.render('customers/cart', {
                    layout,
                    data    
                })
            };
            res.render('customers/cart', {
                layout,
                
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    
    async update(req, res) {
        try {
            const order = await MenuSchema.findById(req.body.id)
            // for the first time creating cart and adding basic structior 
            if (!req.session.cart) {
                req.session.cart = {
                    item: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            // if item not in cart
            if (!cart.item[req.body.id]) {
                cart.item[req.body.id] = {
                    item: order,
                    Qty: 1,
                    priceQty: order.price 
                }
                cart.totalQty += 1;
                cart.totalPrice += order.price
                
            } else {      // if item exist in to cart
                cart.item[req.body.id].Qty += 1;
                cart.item[req.body.id].priceQty = order.price * cart.item[req.body.id].Qty ;
                cart.totalQty += 1;
                cart.totalPrice += order.price
            }
            res.json({
                "totalQty": req.session.cart.totalQty
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = CartControler;