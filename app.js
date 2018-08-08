var express = require("express");
var app = express();
var bodyParser= require('body-parser')
var MongoClient = require('mongodb').MongoClient;

const ROOT_PATH = "/collusion";

app.use(express.static(__dirname + '/public'));

var MongoClient = require('mongodb').MongoClient;

var db;
var uri = "mongodb+srv://raphael:muzjk2nn@collusion-uoq1b.mongodb.net/collusion?retryWrites=true";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if (err) return console.log(err)
    db = client.db('collusion');
    console.log("Connected to database");

    app.listen(3000, "127.0.0.1", function(){
        console.log("Server is listening");
    });

});

app.use(bodyParser.urlencoded({extended: true}));

app.get(ROOT_PATH, function(req, res){
    res.render("home.ejs");
});


app.get(ROOT_PATH+"/remote-controller", (req, res) => {
    res.render("remote-controller.ejs", {rootPath:ROOT_PATH});
});

app.post(ROOT_PATH+'/remote-controller', (req, res) => {

    var request = req.body;
    console.log(request);
    
    if(request.flesh == "on" || request.flesh == "off"){
        console.log("in");   
        if (request.flesh == "on") {
            db.collection('collusion-collection').update(
                {flesh:1},
                {
                    flesh:1,
                    display:"on"
                },
                { upsert: true}
            );
        }

        if (request.flesh == "off") {
            db.collection('collusion-collection').update(
                {flesh:1}, 
                {
                    flesh:1,
                    display:"off"
                },
                { upsert: true}
            );
        }
    } else {
    console.log("out1");
    if(request.device1 != ""){
       console.log("out2");
        db.collection('collusion-collection').update(
            {device:1},
            {
                device:1,
                freq:request.device1
            },
            { upsert: true}
        );
    }


    if(request.device2 != ""){

        db.collection('collusion-collection').update(
            {device:2},
            {
                device:2,
                freq:request.device2
            },
            { upsert: true}
        );
    }
    

    if(request.device3 != ""){
   
        db.collection('collusion-collection').update(
            {device:3},
            {
                device:3,
                freq:request.device3
            },
            { upsert: true}
        );
    }

    if(request.device4 != ""){

        db.collection('collusion-collection').update(
            {device:4},
            {
                device:4,
                freq:request.device4
            },
            { upsert: true}
        );
    }
    }

    res.render("remote-controller.ejs", {rootPath:ROOT_PATH, val1:request.device1,val2:request.device2, val3:request.device3, val4:request.device4 });

});

app.get(ROOT_PATH+'/terminal1', (req, res) => {
    res.render("terminal1.ejs");
});

app.get(ROOT_PATH+'/terminal2', (req, res) => {
    res.render("terminal2.ejs");
});

app.get(ROOT_PATH+'/terminal3', (req, res) => {
    res.render("terminal3.ejs");
});

app.get(ROOT_PATH+'/terminal4', (req, res) => {
    res.render("terminal4.ejs");
});


app.get(ROOT_PATH+'/data1', (req, res) => {
   db.collection('collusion-collection').find().toArray(function(err, results) {
        res.json(results[0].freq);
   });
});

app.get(ROOT_PATH+'/data2', (req, res) => {
   db.collection('collusion-collection').find().toArray(function(err, results) {
        res.json(results[1].freq);
   });
});

app.get(ROOT_PATH+'/data3', (req, res) => {
   db.collection('collusion-collection').find().toArray(function(err, results) {
        res.json(results[2].freq);
   });
});


app.get(ROOT_PATH+'/data4', (req, res) => {
   db.collection('collusion-collection').find().toArray(function(err, results) {
        res.json(results[3].freq);
   });
});


app.get(ROOT_PATH+'/flesh', (req, res) => {
   db.collection('collusion-collection').find().toArray(function(err, results) {
        res.json(results[4].display);
   });
});
