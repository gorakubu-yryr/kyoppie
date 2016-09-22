var models = require("../../models")
module.exports = function(token){
    return models.follows.find({
        fromUser:token.user.id
    }).then(function(followings){
        followings.push(token.user);
        return models.posts.find({
            user:{$in:followings}
        }).populate("app user").sort('-createdAt')
    })
}