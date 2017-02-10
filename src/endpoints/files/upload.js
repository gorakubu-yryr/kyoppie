var models = require("../../models")
var request = require("request")
var crypto = require("crypto")
module.exports = async function (buffer) {
    function getFileServer() {
        return models.file_servers.findOne().then(function(server) {
            if (!server) throw "not-found-fileserver"
            return Promise.resolve(server)
        })
    }
    var _hash = crypto.createHash("sha256")
    _hash.update(buffer)
    var hash = _hash.digest("hex")
    file = await models.files.findOne({hash})
    if (file) return file
    var file_server = await getFileServer()
    var body = await new Promise(function(resolve,reject) {
        request.post({
            url:file_server.url+"/api/v1/upload",
            formData:{
                file:{
                    value:buffer,
                    options:{
                        filename:"upload"
                    }
                },
            },
            headers:{
                "X-Kyoppie-File-Key":file_server.secretKey
            }
        },function(err,res,body) {
            if (err) reject(err)
            resolve(body)
        })
    })
    body = JSON.parse(body)
    if (body.error) throw body.error
    var file = new models.files()
    file.type = body.type
    file.server = file_server.id
    file.host = file_server.url
    file.path = body.url
    file.hash = hash
    file.thumbnailPath = body.thumbnail
    return await file.save()
}