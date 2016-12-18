var models = require("../../models")
module.exports = function* (token,id) {
    var app = yield models.apps.findById(id)
    if (app.user != token.user.id) {
        return Promise.reject("damedesu")
    }
    return app
}