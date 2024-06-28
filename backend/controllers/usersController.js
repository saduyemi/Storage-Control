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
        res.send(user);
    }
    catch (err) {
        res.send(err);
    }
}

// include
const login_valid = async (req, res) => {
    const userInfo = {email: req.body.email, password: req.body.password};
    
    try {
        const user = await getProfileByEmail(userInfo);
        const token = createToken(user.UserID);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 900000 });
        res.json(user);
    }
    catch (err) {
        res.send(err);
    } 
}

const checkUser_get = async (req, res) => {
    const userInfo = {email: req.params.email, password: req.params.password};
    
    try {
        const result = await getProfileByEmail(userInfo);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}

// include
const delete_post = async (req, res) => {
    const userID = Number(req.params.id);

    const result = await deleteUser(userID);

    res.send(result);
}

const logoffUser = async (req, res) => {
    res.cookie('jwt', ' ', { maxAge: 1});
    res.json({ message: "User Logged Out" });
}

module.exports = { selectAllUsers, login_valid, createuser_post, checkUser_get, delete_post, logoffUser };
