var models = require("../../../models")
module.exports = async function (token,id) {
    if (!token.user.adminFlag.fileServer) throw "no-permission"
    return await models.file_servers.findById(id)
}