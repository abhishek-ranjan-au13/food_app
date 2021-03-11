const OrderSchema = require('../../../modals/orderSchema');

const StatusControler = {
    async postStatus(req,res){
        try {
            await OrderSchema.updateOne({_id:req.body.orderId},{status:req.body.status})
            res.redirect('/admin/order')

        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = StatusControler