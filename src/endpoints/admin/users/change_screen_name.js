var models = require("../../../models")
module.exports = async function (token, id, newScreenName) {
    if (!token.user.adminFlag.userMng) throw "no-permission"
    if (!id) throw "id-is-required"
    if (!newScreenName) throw "newScreenName-is-required"
    var user = await models.users.findById(id)
    if (!user) throw "user-not-found"
    if (await models.users.findOne({screenNameLower:newScreenName.toLowerCase()})) throw "already-user-found"
    user.screenName = newScreenName
    user.screenNameLower = newScreenName.toLowerCase()
    return await user.save()
}