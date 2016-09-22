var getRedisConnection = require("../../../utils/getRedisConnection");
var show = require("../../../endpoints/posts/show")
module.exports = function(ws){
    var streaming = getRedisConnection();
    streaming.subscribe("kyoppie:posts-timeline:"+ws.token.user.id);
    streaming.on("message",function(_,msg){
        console.log(msg)
        show(msg).then(function(post){
            ws.send(JSON.stringify({
                result:true,
                response:post.toResponseObject()
            }))
        })
    })
    ws.on("close",function(){
        streaming.quit();
    })
}
