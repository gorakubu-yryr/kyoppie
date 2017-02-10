var models = require("../../models")
var newSignatureKey = require("../../utils/newSignatureKey")
module.exports = async function (appKey) {
    var sig
    if (!appKey) throw "appKey-is-require"
    var app = await models.apps.findOne({appKey})
    if (!app) throw "app-is-not-found"
    sig = new models.signatures()
    sig.app = app.id
    sig.sigKey = newSignatureKey()
    sig.sigHash = newSignatureKey()
    return await sig.save()
}