var models = require("../../../models")
module.exports = async function (token,id) {
    if (!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if (!id) return Promise.reject("id-is-required")
    var user = await models.users.findById(id)
    if (!user) return Promise.reject("user-not-found")
    user.isSuspended = true
    await user.save()
    return "ok"
}