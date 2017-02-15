var routes = require("../routes")
var fs = require("fs")
const DOC_PATH=__dirname+"/../../docs/api-endpoints/"
var notfound_flag = false
var create_doc_flag = true

// path内のディレクトリがあるかどうかを見てなかったらディレクトリを作る
function pathCheck (pathstring) {
    var path = pathstring.replace("\\","/").split("/")
    for (var i = 2 ; i < path.length ; i++ ) {
        var now_path = path.slice(0,i)
        if (!fs.existsSync(now_path.join("/"))) {
            fs.mkdirSync(now_path.join("/"))
        }
    }
}

routes.rest.forEach(function(route) { // REST API
    var path = DOC_PATH+"rest"+route.name+".md"
    if (path.substr(-4) == "/.md") path = path.replace("/.md","/index.md")
    if (!fs.existsSync(path)) {
        notfound_flag = true
        if (create_doc_flag) {
            pathCheck(path)
            console.log(route)
            var template = `\
# ${route.method.toUpperCase()} ${route.name}

${route.login != false ? "- This API is Auth Required\n" : ""}\
${route.isWeb ? "- This API is Web Only\n" : ""}\
${route.isAdmin ? "- This API is Web and Admin User Only\n" : ""}\

- [Params](#params)
- [API Code](/kyoppie/kyoppie-api/blob/master/src/endpoints${route.name}.js)
- [Handle Code](/kyoppie/kyoppie-api/blob/master/src/handlers/web${route.name}.js)

## params

`
            try {
                var params_string = `
name|description
---|---
`
                var params_flag = false
                var handler_js = fs.readFileSync(__dirname+"/../handlers/web"+route.name+".js".replace("/.js","/index.js")).toString()
                if (~handler_js.indexOf("this.file.")) {
                    params_string += `file|`
                    params_flag = true
                }
                var params = (handler_js.match(/(body|query)\.([a-zA-Z_]+)/g) || []).map(function(name) {
                    return name.replace(/(body|query)\.(.+)/,"$2")
                })
                params.forEach(function(name) {
                    params_string += `${name}|\n`
                    params_flag = true
                })
                if (params_flag) {
                    template += params_string
                } else {
                    template += "This API is No Parameters."
                }
            } catch (e) {
                // 知らず
                console.log(e)
            }
            fs.writeFileSync(path,template)
        } else {
            console.log("Document Not Found: docs/api-endpoints/rest"+route.name+".md")
        }
    }
})
routes.websocket.forEach(function(route) {
    if (!fs.existsSync(DOC_PATH+"websocket"+route.name+".md")) {
        notfound_flag = true
        console.log("Document Not Found: docs/api-endpoints/websocket"+route.name+".md")
    }
})

if (notfound_flag) process.exit(1)