var models = require("../../models")
var request = require("request")
var crypto = require("crypto")
module.exports = function* (buffer){
    function getFileServer(){
        return models.file_servers.findOne().then(function(server){
            if(!server) return Promise.reject("not-found-fileserver")
            return Promise.resolve(server)
        });
    }
    var ok_flag = false;
    var _hash = crypto.createHash("sha256");
    _hash.update(buffer);
    var hash = _hash.digest("hex")
    var file = yield models.files.findOne({hash})
    if(file) return file
    var file_server = yield getFileServer()
    var body = yield new Promise(function(resolve,reject){
        var req = request.post({
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
        },function(err,res,body){
            if(err) reject(err);
            resolve(body)
        })
    })
    body = JSON.parse(body)
    if(body.error) return Promise.reject(body.error)
    var file = new models.files();
    file.type = body.type;
    file.server = file_server.id;
    file.host = file_server.url;
    file.path = body.url;
    file.hash = hash;
    file.thumbnailPath = body.thumbnail;
    return yield file.save();
}