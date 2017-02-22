var models = require("../../../models")
module.exports = async function (token,id) {
    if (!token.user.adminFlag.userMng) throw "no-permission"
    if (!id) throw "id-is-required"
    var user = await models.users.findById(id)
    if (!user) throw "user-not-found"
    user.isVerified = false
    await user.save()
    return "ok"
}