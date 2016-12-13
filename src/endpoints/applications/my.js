var models = require("../../models")
module.exports = function* (token) {
    return yield models.apps.find({
        user:token.user.id
    }).sort('-createdAt')
}