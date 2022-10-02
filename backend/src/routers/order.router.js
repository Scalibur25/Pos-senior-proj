const router = require('express').Router();
const controller = require('../controllers/order.controller');


router.post('/', controller.createItems);



module.exports = router;