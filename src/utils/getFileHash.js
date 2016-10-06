var crypto = require("crypto")
var fs = require("fs")
module.exports = function(path){
    return new Promise(function(resolve,reject){
        var read_stream_1 = fs.ReadStream(path);
        var hashsum = crypto.createHash("sha256");
        read_stream_1.on("data",function(data){
            hashsum.update(data)
        })
        read_stream_1.on("end",function(){
            resolve(hashsum.digest("hex"));
        })
        read_stream_1.on("error",function(e){
            reject(e);
        })
    });
}