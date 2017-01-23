var models = require("../../models")
var crypto = require("crypto")
module.exports = async function (token, appId) {
    if (!appId) return Promise.reject("appId-is-require")
    var app = await models.apps.findById(appId)
    if (!app) return Promise.reject("app-not-found")
    if (app.user != token.user.id) return Promise.reject("you-are-not-the-owner-of-this-app")
    var access_token = await models.access_tokens.findOne({
        user:token.user.id,
        app:app.id
    })
    if (access_token) return access_token.secret
    access_token = new models.access_tokens
    access_token.user = token.user.id
    access_token.app = app.id
    access_token.secret = crypto.createHash("sha256").update(app.appKey+access_token.token+app.appSecret).digest("hex")
    await access_token.save()
    return access_token.secret
}