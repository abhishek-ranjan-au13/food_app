const Menu = require('../../../modals/menuSchema');
const path = require('path');
const layout = path.join('layouts')


const HomeControler = {
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
    // async create(req, res){
    //     try {
    //         const menu = await new Menu({
    //             name:req.body.name,
    //             image:req.body.image,
    //             price:req.body.price,
    //             description:req.body.description
    //         });
    //         await menu.save();
    //         res.send('Data added')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


};

module.exports = HomeControler;

