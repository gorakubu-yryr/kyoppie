var models = require("../../../models")
module.exports = async function (token, id, newScreenName) {
    if (!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if (!id) return Promise.reject("id-is-required")
    if (!newScreenName) return Promise.reject("newScreenName-is-required")
    var user = await models.users.findById(id)
    if (!user) return Promise.reject("user-not-found")
    if (await models.users.findOne({screenNameLower:newScreenName.toLowerCase()})) return Promise.reject("already-user-found")
    user.screenName = newScreenName
    user.screenNameLower = newScreenName.toLowerCase()
    return await user.save()
}