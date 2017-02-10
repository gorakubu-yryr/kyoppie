var models = require("../../../models")
module.exports = async function (token,screenName,id) {
    if (!token.user.adminFlag.userMng) throw "no-permission"
    if (!screenName && !id) throw "screenName-or-id-require"
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = await models.users.findById(id)
    }
    if (!user) throw "user-not-found"
    return user
}
