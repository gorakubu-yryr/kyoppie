var crypto = require("crypto")
var models = require("../../models")
var getHashedPassword = require("../../utils/getHashedPassword")
var newPasswordHash = require("../../utils/newPasswordHash")
module.exports = function(requestToken,screenName,password){
    var request_token;
    if(!requestToken) return Promise.reject("require-requestToken")
    if(!screenName && typeof screenName !== "string") return Promise.reject("require-screenName")
    if(!password && typeof password !== "string") return Promise.reject("require-password")
    return models.request_tokens.findOne({
        token:requestToken
    }).populate("app").then(function(_){
        if(!_) return Promise.reject("requestToken-invalid")
        if(!_.app.isWeb) return Promise.reject("this-api-is-web-only")
        request_token=_;
        return models.users.findOne({screenNameLower:screenName.toLowerCase()})
    }).then(function(res){
        if(res) return Promise.reject("duplicate-screenName")
        var salt = newPasswordHash(screenName)
        var hashPassword = getHashedPassword(password,salt)
        var user = new models.users()
        user.screenName = screenName;
        user.screenNameLower = screenName.toLowerCase();
        user.password = hashPassword;
        user.passwordSalt = salt;
        return user.save();
    }).then(function(user){
        var pin_code = new models.pin_codes()
        pin_code.app = request_token.app;
        pin_code.request_token = request_token.id;
        pin_code.user = user;
        return pin_code.save();
    })
}