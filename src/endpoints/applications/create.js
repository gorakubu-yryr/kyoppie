var models = require("../../models")
module.exports = function* (token,name,isWeb = false){
    if(!name) return Promise.reject("name-is-require")
    var app = yield models.apps.findOne({name})
    if(app) return Promise.reject("this-name-is-already-used")
    app = new models.apps()
    app.user = token.user.id
    app.name = name
    app.isWeb = isWeb
    return yield app.save()
}