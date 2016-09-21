var models = require("../../models")
var newSignatureKey = require("../../utils/newSignatureKey")
module.exports = function(appKey){
    var sig;
    if(!appKey) return reject("appKey-is-require");
    return models.apps.findOne({appKey}).then(function(app){
        if(!app) return Promise.reject("app-is-not-found");
        sig = new models.signatures();
        sig.app = app.id;
        sig.sigKey = newSignatureKey();
        sig.sigHash = newSignatureKey();
        return sig.save();
    }).then(function(){
        return Promise.resolve(sig)
    });
}