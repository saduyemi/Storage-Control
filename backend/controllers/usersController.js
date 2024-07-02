const { getProfiles, getProfileByEmail, createUser, deleteUser } = require('../models/profiles');
const { createToken } = require('./authentication');

const selectAllUsers = async (req, res) => {
    const rows = await getProfiles();
    res.status(200).send(rows);
}

/*const login_email = async (req, res) => {
    const userEmail = req.params.email; // for json -> req.body.email;

    const rows = await getProfileByEmail(userEmail);
    res.status(200).send(rows);
};*/

// include
const createuser_post = async (req, res) => {
    const userInfo = {email: req.params.email, password: req.params.password};
    
    try {
        const user = await createUser(userInfo);
        const token = createToken(user.UserID);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 900000 });
        res.status(201).json({feed: user});
    }
    catch (err) {
        res.status(400).send({message: err});
    }
}

// include
const login_valid = async (req, res) => {
    const userInfo = {email: req.body.email, password: req.body.password};
    
    try {
        const user = await getProfileByEmail(userInfo);
        const token = createToken(user.userID);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 900000 });
        res.status(200).json({message: "User Logged In", userID: user.userID, userEmail: user.userEmail});
    }
    catch (err) {
        res.status(404).json({message: err});
    } 
}

const checkUser_get = async (req, res) => {
    const userInfo = {email: req.params.email, password: req.params.password};
    
    try {
        const result = await getProfileByEmail(userInfo);
        res.status(200).json({feed: result});
    }
    catch (err) {
        res.status(404).json({message: "User Not Found"});
    }
}

// include
const delete_post = async (req, res) => {
    const userID = Number(req.params.id);

    try {
        const result = await deleteUser(userID);
        res.status(200).json({feedback: result});
    }
    catch(err) {
        res.status(400).json({message: "Error occured, user was not deleted"});
    }
}

const logoffUser = async (req, res) => {
    res.cookie('jwt', ' ', { maxAge: 1});
    res.status(200).json({ message: "User Logged Out" });
}

// extra remove 
const login_server = async (req, res) => {
    const userInfo = {email: req.params.email, password: req.params.password};
    
    try {
        const user = await getProfileByEmail(userInfo);
        const token = createToken(user.userID);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 900000 });
        res.status(200).json({info: user});
    }
    catch (err) {
        res.status(404).json({message: err});
    } 
}
module.exports = { selectAllUsers, login_valid, createuser_post, checkUser_get, delete_post, logoffUser, login_server };
