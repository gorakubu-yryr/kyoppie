var models = require("../../models")
var isValidDateString = require("../../utils/isValidDateString")
var getSinceMaxDateObject = require("../../utils/getSinceMaxDateObject")
module.exports = async function (token,sinceDate,maxDate,limit) {
    if (token.user.isSuspended) throw "this-user-is-suspended"
    if (sinceDate && !isValidDateString(sinceDate)) throw "invalid-sinceDate"
    if (maxDate && !isValidDateString(maxDate)) throw "invalid-maxDate"
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
        createdAt:getSinceMaxDateObject(sinceDate,maxDate)
    }).populate("app user files").sort('-createdAt').limit(limit)
    return posts.filter(post => !post.user.isSuspended)
}