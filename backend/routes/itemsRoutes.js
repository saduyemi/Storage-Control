const { Router } = require('express');
const itemsControl = require('../controllers/itemsController');
const { authenticateToken } = require('../controllers/authentication');

const router = Router();

// Get items for logged in user
router.post('/items', authenticateToken, itemsControl.selectItem);

// create request
router.post('/create_item', authenticateToken, itemsControl.createNewItem);

// update request
router.patch('/update/item_name/:id/:name', authenticateToken, itemsControl.updateItemName);
router.patch('/update/item_amount/:id/:amount', authenticateToken, itemsControl.updateItemAmount);
router.patch('/update/item_category/:id/:category', authenticateToken, itemsControl.updateItemCategory);
router.patch('/update/item_price/:id/:price', authenticateToken, itemsControl.updateItemPrice);
router.patch('/update/item_picture/:id/:picture', authenticateToken, itemsControl.updateItemPicture);

router.put('/update_item', authenticateToken, itemsControl.modifyItem);

// delete request
router.delete('/delete_item', authenticateToken, itemsControl.deleteGivenItem);

module.exports = router;

//router.get('/items', itemsControl.selectAllItems);
