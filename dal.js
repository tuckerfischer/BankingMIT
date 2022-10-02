const { MongoClient, ServerApiVersion } = require('mongodb');

//const url = 'mongodb://localhost:27017';

const url = "mongodb+srv://inputertest:gqhsfGI0lrpvujCR@mernmitbank.zzeu5.mongodb.net/?retryWrites=true&w=majority";

let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    db = client.db('myproject');
})

function create(name, email, password, balance) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

function balance_data(email, balance) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('balance');
        const doc = {email, balance};
        collection.updateOne(
            { "email" : email },
      { $set: { "balance" : balance } },
            {
              upsert: true
            }, function(err, result) {
                err ? reject(err) : resolve(doc);
            }
         )
    });
};

function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

function one(email){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('balance')
            .find({"email": email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

module.exports = {create, all, balance_data, one}