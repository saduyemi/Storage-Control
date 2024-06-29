const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SIGNATURE, { expiresIn: maxAge });
}



// custom middleware to authenticate user
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if jwt exists
    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send( { message: err} ); 
            }
            else {
                console.log(`User ID: ${decodedToken.id} Requested Data`);
                req.userID = decodedToken.id; // create a new property for req named userID it'll store the value of id that is stored in payload
                next();
            }
        });
    }

    // if jwt doesn't exist
    else {
        console.log( { message: "Not Verified" });
        res.send( {message: "Not verified"} );
        // redirect to login page here add and comment out rest
        //next(); uncommenting this will show error because already sent a reponse in this middleware
    }
}

const checkProfile = (req, res, next) => {
    res.locals.extra = "some text";
    console.log("Local Stored");
    next();
}
module.exports = { createToken, authenticateToken, checkProfile };

