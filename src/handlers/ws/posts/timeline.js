var getRedisConnection = require("../../../utils/getRedisConnection")
var show = require("../../../endpoints/posts/show")
var co = require("co")
module.exports = function(ws){
    var streaming = getRedisConnection()
    streaming.subscribe("kyoppie:posts-timeline:"+ws.token.user.id)
    streaming.on("message",function(_,msg){
        co(function*() {
            var post = yield show(msg)
            ws.sendJSON({
                result:true,
                response:yield post.toResponseObject(ws.token)
            })
        })
    })
    ws.on("close",function(){
        streaming.quit()
    })
}
