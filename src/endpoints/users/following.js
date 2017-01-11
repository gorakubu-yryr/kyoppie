var models = require("../../models")
module.exports = function* (screenName,id) {
    if (!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user
    if (screenName) {
        user = yield models.users.findOne({screenNameLower:screenName.toLowerCase()}).populate("avatar")
    } else {
        user = yield models.users.findById(id).populate("avatar")
    }
    if (!user) return Promise.reject("user-not-found")
    if (user.isSuspended) return Promise.reject("this-user-is-suspended")
    var follows = yield models.follows.find({
        fromUser:user.id
    }).populate("toUser")
    follows = follows.map(follow => follow.toUser).filter(user => !user.isSuspended)
    return follows
}
