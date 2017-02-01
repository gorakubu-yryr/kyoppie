var models = require("../../models")
var isValidDateString = require("../../utils/isValidDateString")
var getSinceMaxDateObject = require("../../utils/getSinceMaxDateObject")
module.exports = async function (sinceDate,maxDate,limit) {
    if (sinceDate && !isValidDateString(sinceDate)) return Promise.reject("invalid-sinceDate")
    if (maxDate && !isValidDateString(maxDate)) return Promise.reject("invalid-maxDate")
    if (isFinite(limit)) {
        if (limit < 1) return Promise.reject("invalid-limit")
    } else limit = 100
    var users = await models.users.find({isSuspended:true}).select("_id")
    users = users.map(user => {return {user:user._id}})
    console.log(users)
    var query = {createdAt:getSinceMaxDateObject(sinceDate,maxDate)}
    if (users.length) query.$nor = users
    var posts = await models.posts.find(query).populate("app user files").sort('-createdAt')
    return posts
}