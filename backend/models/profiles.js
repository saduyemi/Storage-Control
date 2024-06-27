const sqlConn = require('./config');
const validator = require('validator'); // note move email and password validation to front end and just hash passwords in backend
const bcrypt = require('bcrypt');

async function createUser(userInfo) {
    if (!validator.isEmail(userInfo.email) || (userInfo.password).length < 7) {
        return ({message: "Invalid Credentials"}); // throw this instead of returning
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userInfo.password, salt); // increase size of password to 255
    
    let [ rows ] = await sqlConn.query(`
        INSERT INTO Profiles (email, password)
        VALUES (?, ?)
        `, [userInfo.email, hashedPassword]);
    
    return rows;
}


async function getProfiles() {
    let [ rows ] = await sqlConn.query("SELECT * FROM Profiles");
    return rows;
}

async function getProfileByID(id) {}

// note await pauses the execution of the function until that line is finished
async function getProfileByEmail(userInfo) {
    
    let [ rows ] = await sqlConn.query(
        `SELECT * FROM Profiles 
        WHERE Email = ?`, userInfo.email);
    
    if (rows.length == 0) {
        throw({ message: "User not found" });
    }
    
    //console.log(userInfo.password, rows[0].Password); // sql columns are case sensitive

    const auth = await bcrypt.compare(userInfo.password, rows[0].Password);
    
    if (auth) {
        return {message: "User Logged In"};
    }
    else {
        throw({message: "Invalid Password"});
    }    
} 

async function changeUsername(userInfo) {}
async function changePassword(userInfo) {}

async function deleteUser(userID) { 
    let feedback = await sqlConn.query(`
            DELETE FROM Profiles WHERE UserID=?
        `, [userID]);
    
    return feedback;
    // also delete items in Items Table with the corresponding userID
}

module.exports = { getProfiles, getProfileByEmail, createUser, deleteUser };