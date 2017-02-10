var models = require("../../../models")
module.exports = async function (token) {
    if (!token.user.adminFlag.userMng) throw "no-permission"
    return await models.users.find().sort("createdAt")
}
