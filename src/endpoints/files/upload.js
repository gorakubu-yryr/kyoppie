var models = require("../../models")
var request = require("request")
var crypto = require("crypto")
module.exports = function(buffer){
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
    return models.files.findOne({hash}).then(function(file){
        if(file) return Promise.resolve(file);
        var file_server;
        return getFileServer().then(function(server){
            file_server = server;
            return new Promise(function(resolve,reject){
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
        }).then(function(body){
            console.log(body)
            body = JSON.parse(body)
            if(body.error) return Promise.reject(body.error)
            var file = new models.files();
            file.type = body.type;
            file.server = file_server.id;
            file.host = file_server.url;
            file.path = body.path;
            file.hash = hash;
            return file.save();
        })
    })
}