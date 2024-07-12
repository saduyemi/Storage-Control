const { getItems, getAllItemsForUser, getAllItemsForUser2, createItem, createItem2, updateName, updateAmount, updateCategory, updatePrice, updatePicture, updateItem, updateItem2, deleteItem } = require('../models/items');


const selectAllItems = async (req, res) => {
    const rows = await getItems();
    res.status(200).send(rows);
}

const selectItem = async (req, res) => {
    const id = Number(req.userID);
    try {
        const rows = await getAllItemsForUser2(id);
        res.status(200).json({ result: rows });
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ message: err});
    }

}

const createNewItem = async (req, res) => {
    const newItem = { 
        userID: req.userID, 
        name: req.body.name,
        amount: req.body.amount, 
        category: req.body.category, 
        price: req.body.price, 
        picture: req.body.picture, 
        filetype: req.body.filetype
    };

    try {
        const result = await createItem2(newItem);
        res.status(201).json({feedback: result});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({message: "Object was not created"}); 
    }
}

const updateItemName = async (req, res) => {
    const itemID = Number(req.params.id);
    const newName = req.params.name;

    try {
        const result = await updateName(itemID, newName);
        res.status(200).json({feed: result});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured item name was not changed" });
    }
}

const updateItemAmount = async (req, res) => {
    const itemID = Number(req.params.id);
    const newAmount = req.params.amount;

    try {
        const result = await updateAmount(itemID, newAmount);
        res.status(200).json({ feed: result});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured item amount was not changed" });
    }
}

const updateItemCategory = async (req, res) => {
    const itemID = req.params.id;
    const newCategory = req.params.category;

    try {
        const result = await updateCategory(itemID, newCategory);
        res.status(200).json({feed: result});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured item category was not changed" });
    }
}

const updateItemPrice = async (req, res) => {
    const itemID = req.params.id;
    const newPrice = req.params.price;

    try {
        const result = await updatePrice(itemID, newPrice);
        res.status(200).json({feed: result});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured, item PRICE was not changed" });
    }
}

const updateItemPicture = async (req, res) => {
    const itemID = req.params.id;
    const newPicture = req.params.picture;

    try {
        const result = await updatePicture(itemID, newPicture);
        res.status(200).json({feed: result});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured, item PICTURE was not changed" });
    }
}

const modifyItem = async (req, res) => {
    const itemInfo = { 
        itemID: req.body.itemID, 
        name: req.body.name,
        amount: req.body.amount, 
        category: req.body.category, 
        price: req.body.price, 
        picture: req.body.picture 
    };

    try {
        const result = await updateItem2(itemInfo);
        res.status(200).json(itemInfo);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured, item was not changed" });
    }
}

const deleteGivenItem = async (req, res) => {
    const id = req.body.id;
    try {
        const result = await deleteItem(id);
        res.status(200).json({feed: result})
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured, item was not deleted"})
    }
}
module.exports = { selectAllItems, selectItem, createNewItem, updateItemName, updateItemAmount, updateItemCategory, updateItemPrice, updateItemPicture, modifyItem, deleteGivenItem };