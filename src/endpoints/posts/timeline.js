var models = require("../../models")
module.exports = function(token){
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
        }).populate("app user files").sort('-createdAt')
    })
}