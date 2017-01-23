var getRedisConnection = require("../../../utils/getRedisConnection")
var show = require("../../../endpoints/posts/show")
module.exports = function(ws) {
    var streaming = getRedisConnection()
    streaming.subscribe("kyoppie:posts-public_timeline")
    streaming.on("message",async function(_,msg) {
        var post = await show(msg)
        ws.sendJSON({
            result:true,
            response:await post.toResponseObject(ws.token)
        })
    })
    ws.on("close",function() {
        streaming.quit()
    })
}
