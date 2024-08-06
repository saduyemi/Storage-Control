// Delete file

// Middleware file to user multer to parse data that was compressed in FormData object
const multer = require('multer');

// configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
