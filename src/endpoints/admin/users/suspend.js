var models = require("../../../models")
module.exports = function* (token,id) {
    if (!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if (!id) return Promise.reject("id-is-required")
    var user = yield models.users.findById(id)
    if (!user) return Promise.reject("user-not-found")
    user.isSuspended = true
    yield user.save()
    return "ok"
}