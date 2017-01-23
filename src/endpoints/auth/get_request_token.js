var models = require("../../models")
var newRequestToken = require("../../utils/newRequestToken")
var crypto = require("crypto")
module.exports = async function (appKey,appSecretHash,sigKey) {
    var request_token
    if (!appKey) return Promise.reject("appKey-is-require")
    if (!appSecretHash) return Promise.reject("appSecret-is-require")
    if (!sigKey) return Promise.reject("sigKey-is-require")
    var app = await models.apps.findOne({appKey})
    var sig = await models.signatures.findOne({sigKey})
    if (!app) return Promise.reject("app-not-found")
    if (!sig) return Promise.reject("signature-not-found")
    if (sig.app != app.id) return Promise.reject("signature-not-found")
    // 実際に署名する
    var secretHash = crypto.createHash("sha256").update(app.appSecret+sig.sigHash).digest("hex")
    if (secretHash !== appSecretHash) return Promise.reject("invalid-appSecret")
    request_token = new models.request_tokens()
    request_token.app = app.id
    request_token.token = newRequestToken()
    await request_token.save(),
    await models.signatures.findOne({sigKey}).remove()
    return request_token
}