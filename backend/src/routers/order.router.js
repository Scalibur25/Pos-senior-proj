const router = require('express').Router();
const controller = require('../controllers/order.controller');


router.post('/', controller.createOrder);
router.get('/', controller.getOrder);




module.exports = router;