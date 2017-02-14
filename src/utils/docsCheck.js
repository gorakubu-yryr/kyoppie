var routes = require("../routes")
var fs = require("fs")
const DOC_PATH=__dirname+"/docs/api-endpoints/"
var notfound_flag = false

routes.rest.forEach(function(route) {
    if (!fs.existsSync(DOC_PATH+"rest"+route.name+".md")) {
        notfound_flag = true
        console.log("Document Not Found: docs/api-endpoints/rest"+route.name+".md")
    }
})
routes.websocket.forEach(function(route) {
    if (!fs.existsSync(DOC_PATH+"websocket"+route.name+".md")) {
        notfound_flag = true
        console.log("Document Not Found: docs/api-endpoints/websocket"+route.name+".md")
    }
})

if (notfound_flag) process.exit(1)