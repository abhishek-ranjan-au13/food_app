const Menu = require('../../../modals/menuSchema');
const path = require('path');
const layout = path.join('admin/admin_layout');


const MenuControler = {

    getAddForm(req, res) {
        res.render('admin/add', {
            layout
        })
    },

    async postAddForm(req, res) {
        try {
            const { name, price } = req.body;
            if (!name || !price || !req.file) {
                req.flash('error', 'All fields required');
                return res.redirect('/admin/add')
            }
            menu = new Menu({
                name: name,
                price: price,
                image: req.file.filename
            })
            await menu.save();
            res.redirect('/admin')
        } catch (error) {
            console.log(error.message)
        }
    },

    async getUpdatePage(req, res) {
        try {
            const data = await Menu.find();
            res.render('admin/update', {
                layout,
                data
            })
        } catch (err) {
            console.log(err.message)
        }
    },

    async postUpdate(req, res) {
        try {
            const data = await Menu.findById(req.body.id)
            res.json({
                data
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    async postUpdateData(req, res) {
        try {
            await Menu.findOneAndUpdate({ _id: req.body.id },
                {
                    $set:{'name':req.body.name,'price':req.body.price}
                }
            )
            req.flash('seccess','Updated Seccessfully')
            res.redirect('/admin/update')
        } catch (error) {

        }
    },

    async deleteMenu(req,res){
        try {
            const menu = await Menu.findById(req.params.id);
            menu.remove();
            req.flash('seccess','Deleted Seccessfully')
            res.redirect('/admin/update')
        } catch (error) {
            console.log(error.message)
        }
    }

};

module.exports = MenuControler;