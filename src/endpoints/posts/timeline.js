var models = require("../../models")
var getSinceMaxObject = require("../../utils/getSinceMaxObject")
module.exports = async function (token,sinceId,maxId,limit) {
    if (token.user.isSuspended) throw "this-user-is-suspended"
    if (isFinite(limit)) {
        if (limit < 1) throw "invalid-limit"
    } else limit = 100
    var followings = await models.follows.find({
        fromUser:token.user.id
    })
    followings = followings.map(follow => follow.toUser)
    followings.push(token.user.id)
    var posts = await models.posts.find({
        user:{$in:followings},
        _id:getSinceMaxObject(sinceId,maxId)
    }).populate("app user files replyTo").sort('-createdAt').limit(limit)
    return posts.filter(post => !post.user.isSuspended)
}