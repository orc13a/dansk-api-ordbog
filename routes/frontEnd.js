const express = require('express');
const app = express.Router();

app.get('/new', (req, res) => {
    res.render('pages/index', {  });
});

module.exports = app;