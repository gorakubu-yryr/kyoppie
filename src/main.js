var express = require("express")
var app = express();
var models = require("./models")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
var routes = require("./routes")
routes.forEach(function(route){
    var login = true;
if(route.login !== undefined) login = route.login;
    var method = route.method;
    var path = route.name;
    app[method](path,require("./handlers/web"+path));
})
app.all("*",function(req,res){
    // not found
    res.status(404).send({result:false,error:"not-found-api"})
})
app.listen(4005,function(){
    console.log("listen for 4005 port");
})