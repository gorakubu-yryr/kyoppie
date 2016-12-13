var models = require("../../../models")

module.exports = function* (token,name,url) {
    if (!token.user.adminFlag.fileServer) return Promise.reject("not-permission")
    if (!name || typeof name != 'string') return Promise.reject("name-is-required")
    if (!url || typeof url != 'string') return Promise.reject("name-is-required")
    var server = new models.file_servers({
        name,
        url
    })
    return yield server.save()
}