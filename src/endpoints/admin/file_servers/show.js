var models = require("../../../models")
module.exports = async function (token,id) {
    if (!token.user.adminFlag.fileServer) return Promise.reject("damedesu")
    return await models.file_servers.findById(id)
}