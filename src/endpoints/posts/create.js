var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = function(token,text){
    // validate
    if(!text) return Promise.reject("text-is-require")
    var post = new models.posts();
    post.app = token.app;
    post.user = token.user;
    post.text = text;
    return post.save().then(function(post){
        var redis = getRedisConnection();
        redis.publish("kyoppie:posts-timeline:"+token.user.id,post.id)
        redis.quit();
        return Promise.resolve(post)
    });
}