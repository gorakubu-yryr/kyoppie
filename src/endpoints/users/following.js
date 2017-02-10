var models = require("../../models")
module.exports = async function (screenName,id) {
    if (!screenName && !id) throw "screenName-or-id-require"
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()}).populate("avatar")
    } else {
        user = await models.users.findById(id).populate("avatar")
    }
    if (!user) throw "user-not-found"
    if (user.isSuspended) throw "this-user-is-suspended"
    var follows = await models.follows.find({
        fromUser:user.id
    }).populate("toUser")
    follows = follows.map(follow => follow.toUser).filter(user => !user.isSuspended)
    return follows
}
