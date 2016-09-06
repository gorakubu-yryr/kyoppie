var models = require("../../models")
var newRequestToken = require("../../utils/newRequestToken")
var crypto = require("crypto");
module.exports = function(appKey,appSecretHash,sigKey){
    var request_token
    return new Promise(function(resolve,reject){
        if(!appKey) return reject("appKey-is-require");
        if(!appSecretHash) return reject("appSecret-is-require");
        if(!sigKey) return reject("sigKey-is-require");
        Promise.all([
            models.apps.findOne({appKey}),
            models.signatures.findOne({sigKey})
        ]).then(resolve,reject);
    }).then(function(_){
        console.log(_);
        var app=_[0];
        var sig=_[1];
        if(!app) return Promise.reject("app-not-found");
        if(!sig) return Promise.reject("signature-not-found");
        console.log(sig.app)
        if(sig.app != app.id) return Promise.reject("signature-not-found");
        // 実際に署名する
        var secretHash = crypto.createHash("sha256").update(app.appSecret+sig.sigHash).digest("hex");
        if(secretHash !== appSecretHash) return Promise.reject("invalid-appSecret");
        request_token = new models.request_tokens();
        request_token.app = app.id;
        request_token.token = newRequestToken();
        return Promise.all([
            request_token.save(),
            models.signatures.findOne({sigKey}).remove()
        ]);
    }).then(function(_){
        return Promise.resolve(_[0])
    });
}