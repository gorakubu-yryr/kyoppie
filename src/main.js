var express = require("express")
var server = require("http").createServer();
var wss = new require("ws").Server({server});
var app = express();
var models = require("./models")
var bodyParser = require("body-parser")
var url_module = require("url")
var tokenAuth = require("./utils/tokenAuth")
var multer = require("multer")()
var models = require("./models")

console.log("###################")
console.log("### Kyoppie API ###")
console.log("###################")
console.log("Repository: https://github.com/kyoppie/kyoppie-api")

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
app.post('*',function(req,res,next){
    var log = new models.logs();
    log.ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log.path = req.originalUrl;
    res.send_ = res.send;
    res.code_ = res.code;
    res.code = function(code){
        var obj_ = res.code_(code);
        return {
            send:function(obj){
                obj_.send(obj)
                try{
                    log.response = JSON.stringify(obj);
                    log.save();
                }catch(e){}
            }
        }
    }
    res.send = function(obj){
        res.send_(obj)
        try{
            log.response = JSON.stringify(obj);
            log.save();
        }catch(e){}
    }
    next();
})

var routes = require("./routes")
routes.rest.forEach(function(route){
    var login = true;
    if(route.login !== undefined) login = route.login;
    var method = route.method;
    var path = route.name;
    var authFunc = tokenAuth(route,login)
    if(route.file)
        app[method](path,multer.single("file"),authFunc,require("./handlers/web"+path));
    else
        app[method](path,authFunc,require("./handlers/web"+path));
})
var ws_route = {};
routes.websocket.forEach(function(route){
    var login = true;
    if(route.login !== undefined) login = route.login;
    var path = route.name;
    ws_route[path] = route;
    ws_route[path]["login"] = login;
    ws_route[path]["callback"] = require("./handlers/ws"+path)
})
app.all("*",function(req,res){
    // not found
    res.status(404).send({result:false,error:"not-found-api"})
})
wss.on("connection",function(ws){
    var location = url_module.parse(ws.upgradeReq.url,true);
    var url = location.pathname;
    ws.sendJSON = function(json){
        ws.send(JSON.stringify(json))
    }
    if(!ws_route[url]){
        ws.sendJSON({result:false,error:"api-not-found"})
        ws.close();
        return
    }
    console.log(ws_route)
    if(ws_route[url].login){
        if(location.query.access_token){
            models.access_tokens.findOne({
                secret:location.query.access_token
            }).populate("app user").then(function(token){
                console.log(token)
                if(token){
                    ws.token=token;
                    ws_route[url].callback(ws);
                } else {
                    ws.sendJSON({result:false,error:"please-auth"})
                    ws.close()
                    return
                }
            },function(){
                ws.send(JSON.strigify({response:false,error:"server-side-auth-error"}))
                ws.close()
                return
            })
        } else {
            ws.sendJSON({result:false,error:"please-auth"})
            ws.close()
            return
        }
    } else {
        ws_route[url].callback(ws);
    }
})
server.on("request",app);
server.listen(4005,function(){
    console.log("listen for "+server.address().port+" port");
})