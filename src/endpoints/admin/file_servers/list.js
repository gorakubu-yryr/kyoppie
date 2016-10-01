var models = require("../../../models")

module.exports = function(token){
    if(!token.user.adminFlag.fileServer) return Promise.reject("not-permission")
    return models.file_servers.find();
}