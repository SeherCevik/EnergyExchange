const findBlocks = require("./lib/findBlocks");


const MongoClient = require('mongodb').MongoClient;
const URL ='mongodb://localhost:27017';

MongoClient.connect(URL, (err, client) => {
    if (err) throw err;
    const db = client.db('EnergyExchange');
   
    let sorgu = {};
    db.collection('EnergyOffers').find(sorgu).toArray((err, result) => {
        if (err) throw err;
        // console.log(JSON.stringify(result, null, ' '));

        console.log (findBlocks(result));

        client.close();
    });

});