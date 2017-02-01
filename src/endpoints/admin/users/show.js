var models = require("../../../models")
module.exports = async function (token,screenName,id) {
    if (!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if (!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = await models.users.findById(id)
    }
    if (!user) return Promise.reject("user-not-found")
    return user
}
