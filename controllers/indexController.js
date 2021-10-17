const express = require('express');
let router = express.Router();

const indexService = require('../services/indexService')

router.get('/', indexService.serveIndexPage);

module.exports = router;