const express = require('express');
const router = express.Router();
// customers Controlers
const authControler = require('../app/http/controlers/customers/authControler');
const HomeControler = require('../app/http/controlers/customers/homeControler');
const CartControler = require('../app/http/controlers/customers/cartControler')
const OrderControler = require('../app/http/controlers/customers/orderControler')


// Midelwares 
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')

// customers
router.get('/', HomeControler.get);

router.get('/cart',CartControler.get);

router.post('/cart',CartControler.update)

router.get('/login',guest,authControler.getLogin);

router.post('/login', authControler.postLogin);

router.post('/logout',authControler.logout)

router.get('/register',guest, authControler.getRegister);

router.post('/register',authControler.postRegister);

router.post('/order',auth,OrderControler.store);

router.get('/customer/order',auth,OrderControler.get);

module.exports = router;