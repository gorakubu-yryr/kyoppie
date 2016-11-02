var models = require("../../models")
module.exports = function(token){
    if(token.user.isSuspended) return Promise.reject("this-user-is-suspended");
    return models.follows.find({
        fromUser:token.user.id
    }).then(function(followings){
        var _=[];
        followings.forEach(function(follow){
            _.push(follow.toUser);
        })
        _.push(token.user.id)
        return models.posts.find({
            user:{$in:_}
        }).populate("app user user.avatar files").sort('-createdAt')
    }).then(function(posts){
        return posts.filter(function(post){
            return !post.user.isSuspended;
        })
    })
}