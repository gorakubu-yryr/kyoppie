var models = require("../../../models")

module.exports = async function (token,name,url) {
    if (!token.user.adminFlag.fileServer) throw "not-permission"
    if (!name || typeof name != 'string') throw "name-is-required"
    if (!url || typeof url != 'string') throw "name-is-required"
    var server = new models.file_servers({
        name,
        url
    })
    return await server.save()
}