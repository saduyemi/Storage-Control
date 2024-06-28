const { Router } = require('express');
const { authenticateToken } = require('../controllers/authentication')
const profileController = require('../controllers/usersController');

const router = Router();

router.get('/users', profileController.selectAllUsers); // this is not needed

router.get('/create/:email/:password', profileController.createuser_post); // keep, but change to post

router.get('/check/:email/:password', profileController.checkUser_get);

router.get('/delete/:id', profileController.delete_post);

router.get('/login/:email/:password', profileController.login_valid);

router.get('/isvalid', authenticateToken, (req, res) => {
    res.send("User is logged in");
});

router.get('/logout', profileController.logoffUser);

// add routes for user sign up and user logging out

module.exports = router;