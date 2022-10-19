require('dotenv').config();
require('./database/connection');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const fs = require('fs');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

//import Routes
const user = require('./routes/userRoute');
const category = require('./routes/categoryRoute');
const upload = require('./routes/upload');
const product = require('./routes/productRoute');

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(__dirname + process.env.LOG_PATH + 'backoffice.log', { flags: 'a' })
app.use(logger('combined', { "stream": accessLogStream }));
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');
app.use(fileUpload({
    useTempFiles: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({
    secret: 'e-commerce',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', user);
app.use('/', category);
app.use('/', upload);
app.use('/', product);

module.exports = app;