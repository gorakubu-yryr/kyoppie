var models = require("../../models")
module.exports = async function (token,screenName,id) {
    if (!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = await models.users.findById(id)
    }
    if (!user) return Promise.reject("user-not-found")
    if (user.isSuspended) return Promise.reject("this-user-is-suspended")
    if (token.user.id == user.id) return Promise.reject("私が私を見つめてました")
    var follow = await models.follows.findOne({
        fromUser:token.user.id,
        toUser:user.id
    })
    if (!follow) return Promise.reject("not-follow")
    await models.follows.remove({
        fromUser: token.user.id,
        toUser: user.id
    })
    token.user.followingCount -= 1
    user.followersCount -= 1
    await token.user.save()
    await user.save()
    return Promise.resolve("ok")
}
