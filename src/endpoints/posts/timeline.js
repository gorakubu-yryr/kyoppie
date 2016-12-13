var models = require("../../models")
var isValidDateString = require("../../utils/isValidDateString")
var getSinceMaxDateObject = require("../../utils/getSinceMaxDateObject")
module.exports = function* (token,sinceDate,maxDate,limit){
    if(token.user.isSuspended) return Promise.reject("this-user-is-suspended")
    if(sinceDate && !isValidDateString(sinceDate)) return Promise.reject("invalid-sinceDate")
    if(maxDate && !isValidDateString(maxDate)) return Promise.reject("invalid-maxDate")
    if(isFinite(limit)){
        if(limit < 1) return Promise.reject("invalid-limit")
    } else limit = 100
    var followings = yield models.follows.find({
        fromUser:token.user.id
    })
    followings = followings.map(follow => follow.toUser)
    followings.push(token.user.id)
    var posts = yield models.posts.find({
        user:{$in:followings},
        createdAt:getSinceMaxDateObject(sinceDate,maxDate)
    }).populate("app user files").sort('-createdAt').limit(limit)
    return posts.filter(post => !post.user.isSuspended)
}