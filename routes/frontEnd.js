const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('pages/index', {  });
});

app.get('/new', (req, res) => {
    res.render('pages/add', {  });
});

module.exports = app;