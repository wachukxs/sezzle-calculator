const express = require('express');

const app = express();

// routes
let _routes = require('../controllers/indexController')

app.use(_routes)
app.use('/view', express.static('view'))
module.exports = app