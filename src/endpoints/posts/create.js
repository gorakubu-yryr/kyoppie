var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = function(token,text){
    // validate
    if(!text) return Promise.reject("text-is-require")
    var post = new models.posts();
    post.app = token.app;
    post.user = token.user;
    post.user.postsCount++;
    post.text = text.replace(/\n+/g,"\n");
    return Promise.all([
        post.save(),
        post.user.save(),
        models.follows.find({toUser:token.user.id})
    ]).then(function(_){
        var post = _[0]
        var redis = getRedisConnection();
        redis.publish("kyoppie:posts-timeline:"+token.user.id,post.id)
        _[2].forEach(function(following){
            redis.publish("kyoppie:posts-timeline:"+following.fromUser,post.id)
        })
        redis.publish("kyoppie:posts-public_timeline",post.id);
        redis.quit();
        return Promise.resolve(post)
    });
}