var models = require("../../models")
module.exports = async function (token,screenName,id) {
    if (!screenName && !id) throw "screenName-or-id-require"
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = await models.users.findById(id)
    }
    if (!user) throw "user-not-found"
    if (user.isSuspended) throw "this-user-is-suspended"
    if (token.user.id == user.id) throw "私が私を見つめてました"
    var follow = await models.follows.findOne({
        fromUser:token.user.id,
        toUser:user.id
    })
    if (!follow) throw "not-follow"
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
