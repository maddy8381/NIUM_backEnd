const bodyParser = require('body-parser');
const express = require('express');

const sequelize = require('./util/database');

const resumeRoutes = require('./routes/resume');
const Candidate = require('./models/candidates');

const app = express();

app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', resumeRoutes);

sequelize.sync().then(result => {
    console.log(result);
    app.listen(8080);
}).catch(err => {
    console.log('sfsdf')
});