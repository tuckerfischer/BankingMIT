var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');


app.use(express.static('public'))
app.use(cors());

app.get('/account/create/:name/:email/:password/:balance', function (req, res) {
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/balance_data/:email/:balance', function (req, res) {
    dal.balance_data(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/balance/:email', function (req, res) {
    dal.one(req.params.email).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});


app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);