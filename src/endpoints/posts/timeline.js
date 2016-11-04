var models = require("../../models")
module.exports = function* (token){
    if(token.user.isSuspended) return Promise.reject("this-user-is-suspended");
    var followings = yield models.follows.find({
        fromUser:token.user.id
    })
    var _=[];
    followings.forEach(function(follow){
        _.push(follow.toUser);
    })
    _.push(token.user.id)
    var posts = yield models.posts.find({
        user:{$in:_}
    }).populate("app user files").sort('-createdAt')
    return posts.filter(function(post){
        return !post.user.isSuspended;
    })
}