const router = require('express').Router();

router.use('/items', require('./item.router'));

router.use('/categories', require('./categories.router'));

router.use('/stock', require('./stock.router'));

router.use('/order', require('./order.router'));


module.exports = router;