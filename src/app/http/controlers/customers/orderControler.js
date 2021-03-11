const OrderSchema = require('../../../modals/orderSchema');
const path = require('path');
const layout = path.join('layouts')

const orderControler = {
    async store(req, res) {
        const { phone, address } = req.body;
        if (!phone || !address) {
            req.flash('error', 'All fields are requiered')
            return res.redirect('/cart')
        }
        try {
            const order = new OrderSchema({
                customerId: req.session.token.id,
                items: req.session.cart.item,
                phone: phone,
                address: address,

            });

            await order.save();
            req.flash('success', 'Order placed seccessfully')
            delete req.session.cart
            res.redirect('/customer/order');
        } catch (err) {
            console.log(err.message)
        }
    },

    async get(req, res) {
        try {
            const order = await OrderSchema.find({ customerId: req.session.token.id },null,{sort:{'created_at':-1}})
            res.render('customers/orders',{
                layout,
                order,
            });

        } catch (error) {
            console.log(error.message)
        }
    }

}

module.exports = orderControler;