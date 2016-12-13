var models = require("../../models")
var newSignatureKey = require("../../utils/newSignatureKey")
module.exports = function* (appKey){
    var sig
    if(!appKey) return Promise.reject("appKey-is-require")
    var app = yield models.apps.findOne({appKey})
    if(!app) return Promise.reject("app-is-not-found")
    sig = new models.signatures()
    sig.app = app.id
    sig.sigKey = newSignatureKey()
    sig.sigHash = newSignatureKey()
    return yield sig.save()
}