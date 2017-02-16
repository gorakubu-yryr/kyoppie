var models = require("../../models")
var getSinceMaxObject = require("../../utils/getSinceMaxObject")
module.exports = async function (sinceId,maxId,limit) {
    if (isFinite(limit)) {
        if (limit < 1) throw "invalid-limit"
    } else limit = 100
    var users = await models.users.find({isSuspended:true}).select("_id")
    users = users.map(user => {return {user:user._id}})
    console.log(users)
    var query = {_id:getSinceMaxObject(sinceId,maxId)}
    if (users.length) query.$nor = users
    var posts = await models.posts.find(query).populate("app user files replyTo").sort('-createdAt')
    return posts
}