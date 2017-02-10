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
    if (follow) throw "already-follow"
    follow = new models.follows
    follow.fromUser = token.user.id
    follow.toUser = user.id
    await follow.save()
    token.user.followingCount += 1
    user.followersCount += 1
    await token.user.save()
    await user.save()
    // 通知作成
    var notification = new models.notifications()
    notification.type = "follow"
    notification.receiveUser = user.id
    notification.targetUser = token.user.id
    await notification.save()
    notification.publish()
    return Promise.resolve("ok")
}
