var express = require("express");
var app = express();
var bodyParser= require('body-parser')

var device1 = 200;
var device2 = 200;
var device3 = 200;
var device4 = 200;
var flesh   = "on";

const ROOT_PATH = "/collusion";

app.listen(3000, "127.0.0.1", function(){
    console.log("Server is listening");
});

app.use(express.static(__dirname + '/public'));

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
            flesh = "on";
        }

        if (request.flesh == "off") {
            flesh = "off";
        }
    } else {
    
        if(request.device1 != ""){
            device1 = request.device1;
        }

        if(request.device2 != ""){
            device2 = request.device2;
        }
    

        if(request.device3 != ""){
            device3 = request.device3;
        }

        if(request.device4 != ""){
            device4 = request.device4;
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
        res.json(device1);
});

app.get(ROOT_PATH+'/data2', (req, res) => {
        res.json(device2);
});

app.get(ROOT_PATH+'/data3', (req, res) => {
        res.json(device3);
});


app.get(ROOT_PATH+'/data4', (req, res) => {
        res.json(device4);
});


app.get(ROOT_PATH+'/flesh', (req, res) => {
        res.json(flesh);
});

