const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const articlesRoutes = require('./routes/articles')
const commentaireRoutes = require('./routes/commentaire')
const userRoutes = require('./routes/user')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/articles', articlesRoutes);
app.use('/api/commentaire', commentaireRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
