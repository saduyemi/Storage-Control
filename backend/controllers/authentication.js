const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const maxAge = 900; // 15 minutes is 900 seconds

const createToken = (id) => {
    console.log(`Creating token for ${id}`);
    return jwt.sign({ id }, process.env.JWT_SIGNATURE, { expiresIn: maxAge });
}



// custom middleware to authenticate user
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    //console.log(req.cookies); <- to check if getting cookies
    // check if jwt exists
    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send( { message: "Tampered"} ); 
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
        console.log( { message: "JWT Does Not Exist" });
        res.status(401).send({message: "JWT Does Not Exist" });
        // redirect to login page here add and comment out rest
        //next(); uncommenting this will show error because already sent a reponse in this middleware
    }
}


module.exports = { createToken, authenticateToken };

