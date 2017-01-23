var models = require("../../models")
module.exports = async function () {
    return await models.users.find({isSuspended:false}).sort("createdAt")
}
