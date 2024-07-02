const { Router } = require('express');
const { authenticateToken } = require('../controllers/authentication')
const profileController = require('../controllers/usersController');

const router = Router();

// Sign In and Sign Out
router.post('/login', profileController.login_valid);
router.post('/logout', profileController.logoffUser);

// Create Account
router.post('/create/:email/:password', profileController.createuser_post); // keep, but change to post

// Delete Account
router.delete('/delete/:id', profileController.delete_post);

// Validation Helper
router.post('/isvalid', authenticateToken, (req, res) => {
    //console.log(req.userID);
    res.status(200).json({ message: "User is logged in" });
}); // Note if want to check cookies from a frontend application, have to make the request post and in options credentials: "include"


module.exports = router;