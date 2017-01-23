var models = require("../../models")
module.exports = async function (token) {
    return await models.apps.find({
        user:token.user.id
    }).sort('-createdAt')
}