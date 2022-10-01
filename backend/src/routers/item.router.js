const router = require('express').Router();
const controller = require('../controllers/item.controller');

router.get('/', controller.getItems);

router.get('/:id', controller.getItemsById);

router.post('/', controller.createItems);

router.put('/:id', controller.updateItems);

router.delete('/:id', controller.deleteItems);

module.exports = router;