var express = require("express")
var ws = require("ws");
var server = require("http").createServer();
var ws_server = new ws.Server({server});
var app = express();
var models = require("./models")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function(req,res,next){
    res.append("Access-Control-Allow-Origin","*")
    res.append("Access-Control-Allow-Method","GET, POST, OPTIONS");
    res.append("Access-Control-Allow-Headers","X-Kyoppie-Access-Token");
    res.append("Access-Control-Max-Age","86400")
    next();
})
app.options('*',function(req,res){
    res.end();
})

var routes = require("./routes")
routes.forEach(function(route){
    var login = true;
    if(route.login !== undefined) login = route.login;
    var method = route.method;
    var path = route.name;
    app[method](path,function(req,res,next){
        if(req.headers["x-kyoppie-access-token"]){
            models.access_tokens.findOne({
                secret:req.headers["x-kyoppie-access-token"]
            }).populate("app user").then(function(token){
                if(token){
                    req.token=token;
                }
                next();
            },function(){
                res.status(500).send({response:false,error:"server-side-auth-error"})
            })
        } else {
            next();
        }
    },function(req,res,next){
        if(login && !req.token){
            res.status(403).send({response:false,error:"please-login"})
        } else {
            next();
        }
    },require("./handlers/web"+path));
})
app.all("*",function(req,res){
    // not found
    res.status(404).send({result:false,error:"not-found-api"})
})
server.on("request",app);
server.listen(4005,function(){
    console.log("listen for "+server.address().port+" port");
})