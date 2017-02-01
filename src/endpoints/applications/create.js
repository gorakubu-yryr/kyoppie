var models = require("../../models")
module.exports = async function (token,name,isWeb = false) {
    if (!name) return Promise.reject("name-is-require")
    var app = await models.apps.findOne({name})
    if (app) return Promise.reject("this-name-is-already-used")
    app = new models.apps()
    app.user = token.user.id
    app.name = name
    app.isWeb = isWeb
    return await app.save()
}