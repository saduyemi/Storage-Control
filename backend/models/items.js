const sqlConn = require('./config');
const {blobToBase64, base64ToArrayBuffer, arrayBufferToBase64} = require('../filesupport');

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

async function getAllItemsForUser2(id) {
    const [ rows ] = await sqlConn.query(`
        SELECT * FROM Items 
        WHERE UserID=?`,[id]);

    if (rows.length == 0) { throw({message: "Invalid ID"}); }
    
    for (let row of rows) {
        if (row) {
            console.log(row.ItemName);
            if (row.ItemPicture) {
                console.log("\tBuffer Picture");
                let base64 = arrayBufferToBase64(row.Prepend, row.ItemPicture);
                //console.log(base64);
                row.ItemPicture = base64;
            }
            //let base64 = arrayBufferToBase64("", row.itemPicture);
            //let string = row.Prepend + base64;
            //row.ItemPicture = string;
        }
        else {
            row.ItemPicture = null;
        }
    }
    
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
            INSERT INTO Items (UserID, ItemName, ItemAmount, ItemCategory, ItemPrice, ItemPicture)
            VALUES (?, ?, ?, ?, ?, ?)    
        `, [userID, name, amount, category, price, picture]);

        return feedback;
    }

    catch(err) {
        throw(err);
    }
}

// Create new item ver 2
async function createItem2(itemInfo) {
    try {
        const { userID, name, amount, category, price, picture } = itemInfo;
        
        const result = base64ToArrayBuffer(picture);
        //console.log("Buffer:", pictureBuffer);
       // kconst back = arrayBufferToBase64(result.prepend, result.buffer);
        //kconsole.log("String", back);
        //kreturn { userID, name, amount, category, price, picture: back};

        const feedback = sqlConn.query(`
            INSERT INTO Items (UserID, ItemName, ItemAmount, ItemCategory, ItemPrice, ItemPicture, Prepend)
            VALUES (?, ?, ?, ?, ?, ?, ?)    
        `, [userID, name, amount, category, price, result.buffer, result.prepend]);

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
    if (newPic === 'null' || newPic === 'NULL') { newPic = null; }  // if statement to use built in null setter for keyword when newPic == null, so that the text "null" won't be stored in column

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
        let { itemID, name, amount, category, price, picture } = itemInfo;

        if (picture === 'null' || picture === 'NULL') { picture = null; }
        
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
async function updateItem2(itemInfo) {
    try {
        let { itemID, name, amount, category, price, picture } = itemInfo;
        let result; 

        if (picture === 'null' || picture === 'NULL') { picture = null; result = null; }
        else { result = base64ToArrayBuffer(picture); }

        const feedback = sqlConn.query(`
            UPDATE Items
            SET ItemName = ?, ItemAmount = ?, ItemCategory = ?, ItemPrice = ?, ItemPicture = ?, Prepend = ?
            WHERE ItemID = ?    
        `, [name, amount, category, price, (picture) ? result.buffer : null, (picture) ? result.prepend : null, itemID]);

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

module.exports = { getItems, getAllItemsForUser, getAllItemsForUser2, createItem, createItem2, updateName, updateAmount, updateCategory, updatePrice, updatePicture, updateItem, updateItem2, deleteItem }; 