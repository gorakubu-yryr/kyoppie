var models = require("../../models")
var getHashedPassword = require("../../utils/getHashedPassword")
module.exports = function(requestToken,screenName,password){
    var request_token;
    return new Promise(function(resolve,reject){
        if(!requestToken) return reject("require-requestToken")
        if(!screenName || typeof screenName !== "string") return reject("require-screenName")
        if(!password || typeof password !== "string") return reject("require-password")
        models.request_tokens.findOne({token:requestToken}).then(resolve,reject);
    }).then(function(_){
        if(!_) return Promise.reject("requestToken-invalid")
        request_token=_;
        return models.users.findOne({screenNameLower:screenName.toLowerCase()})
    }).then(function(user){
        if(!user) return Promise.reject("user-not-found")
        var salt = user.passwordSalt;
        var hashPassword = getHashedPassword(password,salt)
        if(hashPassword != user.password){
            return Promise.reject("invalid-password")
        }
        var pin_code = new models.pin_codes()
        pin_code.app = request_token.app;
        pin_code.request_token = request_token.id;
        return pin_code.save();
    }).then(function(_){
        return models.request_tokens.findOne({token:requestToken}).remove().then(function(){
            return Promise.resolve(_)
        })
    })
}