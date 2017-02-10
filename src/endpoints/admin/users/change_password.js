var models = require("../../../models")
module.exports = async function (token,id,password) {
    if (!token.user.adminFlag.userMng) throw "no-permission"
    if (!id) throw "id-is-required"
    if (!password) throw "password-is-required"
    var user = await models.users.findById(id)
    if (!user) throw "user-not-found"
    user.setPassword(password)
    await user.save()
    return "ok"
}