const mongoose = require('mongoose');
const MenuSchema = mongoose.Schema({
    name :{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
});

module.exports = mongoose.model('menu',MenuSchema);