const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const profileRoutes = require('./routes/profilesRoutes');
const itemRoutes = require('./routes/itemsRoutes');

const app = express();

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173']
}

app.listen(3000);

// middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//app.use(morgan('dev'));


// Routes
app.use(profileRoutes);
app.use(itemRoutes);
