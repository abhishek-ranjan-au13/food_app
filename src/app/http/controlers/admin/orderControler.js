const OrderSchema = require('../../../modals/orderSchema');
const Menu = require('../../../modals/menuSchema');
const path = require('path');
const layout = path.join('admin/admin_layout');

const OrderControler = {
    async get(req, res) {
        try {
            const menu = await Menu.find();
            res.render('home', {
                layout,
                menu
            })
        } catch (error) {
            console.log(error)
        }
    },

    async getOrder(req, res) {
        try {
            const orders = await OrderSchema.find({ status: { $ne: 'Completed' } }, null, { sort: { 'created_at': -1 } }).populate('customerId')
        
            res.render('admin/order', {
                layout,
                dataObj: orders
            })
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = OrderControler

// orders.map(data => {
//     dataObj.id = data._id;
//     dataObj.phone = data.phone;
//     dataObj.address = data.address;
//     dataObj.name = data.customerId.name;
//     dataObj.created_at = data.created_at;
//     let dataArr = []
//     for (let item of Object.values(data.items)) {
//         dataArr.push(item)
//     }
//     dataObj.items = dataArr
// })


