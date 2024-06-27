const sqlConn = require('./config');

async function getItems() {
    const [ rows ] = await sqlConn.query("SELECT * FROM Items");
    return rows;
}

async function getAllItemsForUser(id) {
    const [ rows ] = await sqlConn.query(`
        SELECT * FROM Items 
        WHERE UserID=?`,[id]);

    if (rows.length == 0) { throw({message: "Invalid ID"}); }

    return rows;
}

async function getInfoFor(itemID) {
    try {
        const [ rows ] = await sqlConn.query(`SELECT * FROM Items WHERE ItemID=?`, [itemID]);
        if (rows.length == 0) { throw({ message: "Invalid itemID" }); }
        return rows;
    }
    catch (err) {
        throw(err);
    }
}

// Create new item
async function createItem(itemInfo) {
    try {
        const { userID, name, amount, category, price, picture } = itemInfo;
        
        const feedback = sqlConn.query(`
            INSERT INTO Items (UserID, ItemName, ItemAmount, ItemCategory, ItemPrice)
            VALUES (?, ?, ?, ?, ?)    
        `, [userID, name, amount, category, price, picture]);

        return feedback;
    }

    catch(err) {
        throw(err);
    }
}


// Update name 
async function updateName(itemID, newName) {
    try {
        const result = sqlConn.query(`
            UPDATE Items
            SET ItemName = ?
            WHERE ItemID = ?            
        `, [newName, itemID]);

        return result;
    }
    catch (err) {
        throw(err);
    }
}

// Update amount
async function updateAmount(itemID, newAmount) {
    try {
        const result = sqlConn.query(`
            UPDATE Items
            SET ItemAmount = ?
            WHERE ItemID = ?            
        `, [newAmount, itemID]);

        return result;
    }
    catch (err) {
        throw(err);
    }
}

// Update category
async function updateCategory(itemID, newCategory) {
    try {
        const result = sqlConn.query(`
            UPDATE Items
            SET ItemCategory = ?
            WHERE ItemID = ?            
        `, [newCategory, itemID]);

        return result;
    }
    catch (err) {
        throw(err);
    }
}

// Update price
async function updatePrice(itemID, newPrice) {
    try {
        const result = sqlConn.query(`
            UPDATE Items
            SET ItemPrice = ?
            WHERE ItemID = ?            
        `, [newPrice, itemID]);

        return result;
    }
    catch (err) {
        throw(err);
    }
}

// Update picture
async function updatePicture(itemID, newPic) {
    try {
        const result = sqlConn.query(`
            UPDATE Items
            SET ItemPicture = ?
            WHERE ItemID = ?            
        `, [newPic, itemID]);

        return result;
    }
    catch (err) {
        throw(err);
    }
} 

// Generic way to update all items
async function updateItem(itemInfo) {
    try {
        const { itemID, name, amount, category, price, picture } = itemInfo;


        const feedback = sqlConn.query(`
            UPDATE Items
            SET ItemName = ?, ItemAmount = ?, ItemCategory = ?, ItemPrice = ?, ItemPicture = ?
            WHERE ItemID = ?    
        `, [name, amount, category, price, picture, itemID]);

        return feedback;
    }
    catch (err) {
        throw(err);
    }
}

// Delete item
async function deleteItem(itemID) {
    try {
        const feedback = sqlConn.query(`DELETE FROM Items WHERE ItemID=?`, [itemID]);
        
        return feedback;
    }
    catch (err) {
        throw(err);
    }
}

module.exports = { getItems, getAllItemsForUser, createItem, updateName, updateAmount, updateCategory, updatePrice, updatePicture, updateItem, deleteItem }; 