const { Router } = require('express');
const itemsControl = require('../controllers/itemsController');
const { authenticateToken } = require('../controllers/authentication');

const router = Router();

// leave as get
router.get('/items', itemsControl.selectAllItems);
router.get('/items/:id', itemsControl.selectItem);

// change to post or patch
router.get('/create_item/:userID/:name/:amount/:category/:price/:picture', authenticateToken, itemsControl.createNewItem);

// change to patch
router.get('/update/item_name/:id/:name', authenticateToken, itemsControl.updateItemName);
router.get('/update/item_amount/:id/:amount', authenticateToken, itemsControl.updateItemAmount);
router.get('/update/item_category/:id/:category', authenticateToken, itemsControl.updateItemCategory);
router.get('/update/item_price/:id/:price', authenticateToken, itemsControl.updateItemPrice);
router.get('/update/item_picture/:id/:picture', authenticateToken, itemsControl.updateItemPicture);
router.get('/update/item/:itemID/:name/:amount/:category/:price/:picture', authenticateToken, itemsControl.modifyItem);

// change to delete
router.get('/delete/:id', authenticateToken, itemsControl.deleteGivenItem);

module.exports = router;