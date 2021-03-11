const express = require('express');
const router = express.Router();
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'src/public/img')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+ file.originalname)
    }
})

const uplode = multer({storage:diskStorage});

// middleware for checking user is admin or not
const admin = require('../app/http/middlewares/admin')


// Admin Controlers
const AdminOrderControler = require('../app/http/controlers/admin/orderControler');
const StatusControler = require('../app/http/controlers/admin/statusControler');
const MenuControler = require('../app/http/controlers/admin/menuControler');

// Admin Routes
router.get('/',admin,AdminOrderControler.get);

router.get('/order',admin,AdminOrderControler.getOrder);

router.post('/order',admin,StatusControler.postStatus);

router.get('/add',admin,MenuControler.getAddForm);

router.post('/add',admin,uplode.single('image'),MenuControler.postAddForm);

router.get('/update',admin,MenuControler.getUpdatePage);

router.post('/update',admin,MenuControler.postUpdate);

router.post('/update/dish',admin,MenuControler.postUpdateData);

router.get('/delete/:id',admin,MenuControler.deleteMenu)


module.exports = router;