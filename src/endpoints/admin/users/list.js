var models = require("../../../models")
module.exports = function* (token){
    if(!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    return yield models.users.find().sort("createdAt")
}
