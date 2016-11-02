var koa = require("koa")
var app = koa();
var server = require("http").createServer()
var wss = new require("ws").Server({server});
var models = require("./models")
var bodyParser = require("body-parser")
var url_module = require("url")
var tokenAuth = require("./utils/tokenAuth")
var multer = require("multer")()
var models = require("./models")
var msgpack = require("msgpack5")()
var yaml = require("yamljs")
var bodyParser = require("koa-bodyparser");
var _ = require("koa-route")

console.log("###################")
console.log("### Kyoppie API ###")
console.log("###################")
console.log("Repository: https://github.com/kyoppie/kyoppie-api")

app.use(bodyParser())

// CORS
app.use(function* (next){
    this.append("Access-Control-Allow-Origin","*")
    this.append("Access-Control-Allow-Method","GET, POST, OPTIONS");
    this.append("Access-Control-Allow-Headers","X-Kyoppie-Access-Token");
    this.append("Access-Control-Max-Age","86400")
    yield next;
})
app.use(function* (next){
    if(this.request.method === "OPTIONS"){
        this.response_code = 200;
        this.body = "ok";
        return;
    }
    yield next;
})
app.use(function* (next){
    var origpath = this.request.path;
    this.path = this.path.replace(/\.msgpack$/,"");
    this.path = this.path.replace(/\.yaml$/,"");
    yield next;
    console.log(JSON.stringify(this.body))
    this.body = JSON.parse(JSON.stringify(this.body));
    if(/.*\.msgpack$/.test(origpath)){ // msgpack hack
        this.set("Content-Type","application/x-msgpack");
        this.body = msgpack.encode(this.body)
    } else if(/.*\.yaml$/.test(origpath)){ // yaml hack
        this.set("Content-Type","text/yaml")
        this.body = yaml.stringify(this.body)
    } else { // json
        this.set("Content-Type","application/json")
        this.body = JSON.stringify(this.body)
    }
})
// MongoDB Logger
app.use(function* (next){
    if(this.request.method !== "POST") return yield next;
    var log = new models.logs();
    log.ipaddr = this.request.header['x-forwarded-for'] || this.socket.remoteAddress;
    log.path = this.path;
    yield next;
    log.response = JSON.stringify(this.body);
    yield log.save();
})
var routes = require("./routes")
routes.rest.forEach(function(route){
    var login = true;
    if(route.login !== undefined) login = route.login;
    var method = route.method;
    var path = route.name;
    var authFunc = tokenAuth(route,login)
    var checkSuspended = function* (next){
        if(this.request.method == "POST" && login && this.token.user.isSuspended){
            this.status_code = 403
            this.body = {result:false,error:"this-user-is-suspended"}
            return
        }
        yield next;
    }
    app.use(_[method](path,authFunc));
    if(login) app.use(_[method](path,checkSuspended))
    // if(route.file) 
    app.use(_[method](path,require("./handlers/web"+path)))
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
app.use(function *(){
    this.status_code = 404;
    this.body = {result:false,error:"not-found"}
})
app.on("error",function(err){
    console.log(err)
    this.body = {result:false,error:"server-side-error"}
})
server.on("request",app.callback());
server.listen(4005,function(){
    console.log("listen for "+server.address().port+" port");
})