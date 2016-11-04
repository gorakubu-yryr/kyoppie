var getRedisConnection = require("../../../utils/getRedisConnection");
var show = require("../../../endpoints/posts/show")
var co = require("co")
module.exports = function(ws){
    var streaming = getRedisConnection();
    streaming.subscribe("kyoppie:posts-public_timeline");
    streaming.on("message",function(_,msg){
        console.log(msg)
        co(show(msg)).then(function(post){
            ws.sendJSON({
                result:true,
                response:post.toResponseObject()
            })
        })
    })
    ws.on("close",function(){
        streaming.quit();
    })
}
