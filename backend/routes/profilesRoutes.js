const { Router } = require('express');
const { authenticateToken } = require('../controllers/authentication');
const profileController = require('../controllers/usersController');
const { getProfileByID } = require('../models/profiles');
const router = Router();

// Sign In and Sign Out
router.post('/login', profileController.login_valid);
router.post('/logout', profileController.logoffUser);

// Create Account
router.post('/create_user', profileController.createuser_post); // keep, but change to post

// Delete Account
router.delete('/delete/:id', profileController.delete_post);

// Validation Helper
router.post('/isvalid', authenticateToken, async (req, res) => {
    //console.log(req.userID);
    try {
        const user = await getProfileByID(req.userID);
        res.status(200).json({ message: "User is logged in", username: user});
    }
    catch(err) {
        res.status(404).json({message: err});
    }
}); // Note if want to check cookies from a frontend application, have to make the request post and in options credentials: "include"

router.get('/changepassword/:email/:password', profileController.changepassword_server);

module.exports = router;