var models = require("../../models")
var newRequestToken = require("../../utils/newRequestToken")
var crypto = require("crypto");
module.exports = function(appKey,appSecretHash,sigKey,pinCode,requestToken){
    return new Promise(function(resolve,reject){
        if(!appKey) return reject("appKey-is-require");
        if(!appSecretHash) return reject("appSecret-is-is-require")
        if(!sigKey) return reject("sigKey-is-require")
        if(!pinCode) return reject("pinCode-is-require")
        if(!requestToken) return reject("requestToken-is-require")
        Promise.all([
            models.apps.findOne({appKey}),
            models.signatures.findOne({sigKey}),
            models.request_tokens.findOne({token:requestToken}),
        ]).then(resolve,reject);
    }).then(function(_){
        console.log(_);
        var app=_[0];
        var sig=_[1];
        var request_token=_[2];
        if(!app) return Promise.reject("app-not-found");
        if(!sig) return Promise.reject("signature-not-found");
        if(sig.app != app.id) return Promise.reject("signature-not-found");
        if(!request_token) return Promise.reject("requestToken-not-found");
        if(request_token.app != app.id) return Promise.reject("requestToken-not-found");
        // 実際に署名する
        var secretHash = crypto.createHash("sha256").update(app.appSecret+sig.sigHash).digest("hex");
        if(secretHash !== appSecretHash) return Promise.reject("invalid-appSecret");
        return Promise.all([
            models.pin_codes.findOne({code:pinCode}),
            Promise.resolve(request_token),
            Promise.resolve(app),
            models.signatures.findOne({sigKey}).remove()
        ]);
    }).then(function(_){
        var pin_code=_[0];
        var request_token=_[1];
        var app=_[2];
        if(!pin_code) return Promise.reject("pinCode-not-found");
        if(pin_code.request_token != request_token.id) return Promise.reject("pinCode-not-found");
        return Promise.all([
            models.access_tokens.findOne({user:pin_code.user,app:app.id}),
            models.request_tokens.findOne({token:requestToken}).remove(),
            models.pin_codes.findOne({code:pinCode}).remove()
        ])
    }).then(function(_){
        var access_token=_[0];
        if(access_token) return Promise.resolve(access_token);
        access_token = new models.access_tokens();
        access_token.user = pin_code.user;
        access_token.app = pin_code.app;
        access_token.secret = crypto.createHash("sha256").update(app.appKey+access_token.token+app.appSecret)
        return access_token.save();
    });
}