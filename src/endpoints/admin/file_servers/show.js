var models = require("../../../models")
module.exports = async function (token,id) {
    if (!token.user.adminFlag.fileServer) throw "damedesu"
    return await models.file_servers.findById(id)
}