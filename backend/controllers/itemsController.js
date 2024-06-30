const { getItems, getAllItemsForUser, createItem, updateName, updateAmount, updateCategory, updatePrice, updatePicture, updateItem, deleteItem } = require('../models/items');


const selectAllItems = async (req, res) => {
    const rows = await getItems();
    res.status(200).send(rows);
}

const selectItem = async (req, res) => {
    const id = Number(req.userID);
    try {
        const rows = await getAllItemsForUser(id);
        res.status(200).json(rows);
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ message: err});
    }

}

const createNewItem = async (req, res) => {
    const newItem = { 
        userID: req.params.userID, 
        name: req.params.name,
        amount: req.params.amount, 
        category: req.params.category, 
        price: req.params.price, 
        picture: req.params.picture 
    };

    try {
        const result = await createItem(newItem);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({message: "Object was not created"}); 
    }
}

const updateItemName = async (req, res) => {
    const itemID = Number(req.params.id);
    const newName = req.params.name;

    try {
        const result = await updateName(itemID, newName);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured item name was not changed" });
    }
}

const updateItemAmount = async (req, res) => {
    const itemID = Number(req.params.id);
    const newAmount = req.params.amount;

    try {
        const result = await updateAmount(itemID, newAmount);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured item amount was not changed" });
    }
}

const updateItemCategory = async (req, res) => {
    const itemID = req.params.id;
    const newCategory = req.params.category;

    try {
        const result = await updateCategory(itemID, newCategory);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured item category was not changed" });
    }
}

const updateItemPrice = async (req, res) => {
    const itemID = req.params.id;
    const newPrice = req.params.price;

    try {
        const result = await updatePrice(itemID, newPrice);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured, item PRICE was not changed" });
    }
}

const updateItemPicture = async (req, res) => {
    const itemID = req.params.id;
    const newPicture = req.params.picture;

    try {
        const result = await updatePicture(itemID, newPicture);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured, item PICTURE was not changed" });
    }
}

const modifyItem = async (req, res) => {
    const itemInfo = { 
        itemID: req.params.itemID, 
        name: req.params.name,
        amount: req.params.amount, 
        category: req.params.category, 
        price: req.params.price, 
        picture: req.params.picture 
    };

    try {
        const result = await updateItem(itemInfo);
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured, item was not changed" });
    }
}

const deleteGivenItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteItem(id);
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error occured, item was not deleted"})
    }
}
module.exports = { selectAllItems, selectItem, createNewItem, updateItemName, updateItemAmount, updateItemCategory, updateItemPrice, updateItemPicture, modifyItem, deleteGivenItem };