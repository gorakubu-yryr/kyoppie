var Koa = require("koa")
var app = new Koa()
var server = require("http").createServer()
var wss = new require("ws").Server({server})
var models = require("./models")
var url_module = require("url")
var tokenAuth = require("./utils/tokenAuth")
var multer = require("koa-multer")()
var msgpack = require("msgpack5")()
var yaml = require("yamljs")
var bodyParser = require("koa-bodyparser")
var _ = require("koa-route")
var rulesAgreePeriod = require("./endpoints/web/rules_agree_period")

console.log("###################")
console.log("### Kyoppie API ###")
console.log("###################")
console.log("Repository: https://github.com/kyoppie/kyoppie-api")

// redisの生存確認
var getRedisConnection = require("./utils/getRedisConnection")
var client = getRedisConnection()
client.on("error", e => {
    client.quit()
    console.log("process will exit because of redis is dead.")
    process.exit()
})
client.on("connect", e => {
    client.quit()
})

app.use(bodyParser())

app.use(async function(ctx, next) {
    try {
        await next()
    } catch (err) {
        console.log(err)
        ctx.status = 500
        ctx.body = {result:false,error:"server-side-error"}
    }
})

// CORS
app.use(async function (ctx, next) {
    ctx.append("Access-Control-Allow-Origin","*")
    ctx.append("Access-Control-Allow-Method","GET, POST, OPTIONS")
    ctx.append("Access-Control-Allow-Headers","X-Kyoppie-Access-Token")
    ctx.append("Access-Control-Max-Age","86400")
    await next()
})
app.use(async function (ctx, next) {
    if (ctx.request.method === "OPTIONS") {
        ctx.status = 200
        ctx.body = "ok"
        return
    }
    await next()
})
app.use(async function (ctx, next) {
    var origpath = ctx.path
    ctx.path = ctx.path.replace(/\.msgpack$/,"")
    ctx.path = ctx.path.replace(/\.yaml$/,"")
    await next()
    ctx.body = JSON.parse(JSON.stringify(ctx.body))
    if (/.*\.msgpack$/.test(origpath)) { // msgpack hack
        ctx.set("Content-Type","application/x-msgpack")
        ctx.body = msgpack.encode(ctx.body)
    } else if (/.*\.yaml$/.test(origpath)) { // yaml hack
        ctx.set("Content-Type","text/yaml")
        ctx.body = yaml.stringify(ctx.body)
    } else { // json
        ctx.set("Content-Type","application/json")
        ctx.body = JSON.stringify(ctx.body)
    }
})
// MongoDB Logger
app.use(async function (ctx, next) {
    if (ctx.request.method !== "POST") return await next()
    var log = new models.logs()
    log.ipaddr = ctx.request.header['x-forwarded-for'] || ctx.socket.remoteAddress
    log.path = ctx.path
    await next()
    log.response = JSON.stringify(ctx.body)
    await log.save()
})
// console logger
app.use(async function (ctx, next) {
    await next()
    var log_string = ctx.request.method+" "+ctx.request.path+" "+ctx.status+" "
    if (ctx.body.result === false) log_string += ctx.body.error
    console.log(log_string)
})
// REST APIのrouter
var routes = require("./routes")
routes.rest.forEach(function(route) {
    var login = true
    if (route.login !== undefined) login = route.login
    var method = route.method
    var path = route.name
    var authFunc = tokenAuth(route,login)
    var checkSuspended = async function (ctx, next) {
        if (ctx.request.method == "POST" && login && ctx.token.user.isSuspended) {
            ctx.status = 403
            ctx.body = {result:false,error:"this-user-is-suspended"}
            return
        }
        if (!route.allowNotAgree && login && !ctx.token.user.rulesAgree && rulesAgreePeriod()) {
            ctx.status = 403
            ctx.body = {result:false,error:"please-rules-agree"}
            return
        }
        await next()
    }
    app.use(_[method](path,authFunc))
    if (login) app.use(_[method](path,checkSuspended))
    if (route.file) {
        var multer_func = multer.single("file")
        app.use(_[method](path,async function (ctx, next) {
            await multer_func(ctx)
            ctx.file = ctx.req.file
            await next()
        }))
    }
    var handler = require("./handlers/web"+path)
    app.use(_[method](path,async function(ctx) {
        await handler.bind(ctx)(ctx)
    }))
})
// WebSocket APIのrouter
var ws_route = {}
routes.websocket.forEach(function(route) {
    var login = true
    if (route.login !== undefined) login = route.login
    var path = route.name
    ws_route[path] = route
    ws_route[path]["login"] = login
    ws_route[path]["callback"] = require("./handlers/ws"+path)
})
wss.on("connection",function(ws) {
    var location = url_module.parse(ws.upgradeReq.url,true)
    var url = location.pathname
    ws.sendJSON = function(json) {
        ws.send(JSON.stringify(json))
    }
    if (!ws_route[url]) {
        ws.sendJSON({result:false,error:"api-not-found"})
        ws.close()
        return
    }
    if (ws_route[url].login) {
        if (location.query.access_token) {
            models.access_tokens.findOne({
                secret:location.query.access_token
            }).populate("app user").then(function(token) {
                if (token) {
                    ws.token=token
                    ws_route[url].callback(ws)
                } else {
                    ws.sendJSON({result:false,error:"please-auth"})
                    ws.close()
                    return
                }
            },function() {
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
        ws_route[url].callback(ws)
    }
})
app.use(async function (ctx) {
    ctx.status = 404
    ctx.body = {result:false,error:"not-found"}
})
server.on("request",app.callback())
server.listen(process.env.PORT || 4005,function() {
    console.log("listen for "+server.address().port+" port")
})