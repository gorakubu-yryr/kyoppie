var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = function(token,text){
    // validate
    if(!text) return Promise.reject("text-is-require")
    var post = new models.posts();
    post.app = token.app;
    post.user = token.user;
    post.user.postsCount++;
    post.text = text;
    return Promise.all([
        post.save(),
        post.user.save()
    ]).then(function(_){
        var post = _[0]
        var redis = getRedisConnection();
        redis.publish("kyoppie:posts-timeline:"+token.user.id,post.id)
        redis.quit();
        return Promise.resolve(post)
    });
}