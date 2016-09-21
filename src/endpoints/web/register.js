var crypto = require("crypto")
var models = require("../../models")
var getHashedPassword = require("../../utils/getHashedPassword")
var newPasswordHash = require("../../utils/newPasswordHash")
module.exports = function(screenName,password){
    // validate
    if(!screenName && typeof screenName !== "string") return reject("require-screenName")
    if(!password && typeof password !== "string") return reject("require-password")
    return models.users.findOne({screenNameLower:screenName.toLowerCase()}).then(function(res){
        if(res) return Promise.reject("duplicate-screenName")
        var salt = newPasswordHash(screenName)
        var hashPassword = getHashedPassword(password,salt)
        var user = new models.users()
        user.screenName = screenName;
        user.screenNameLower = screenName.toLowerCase();
        user.password = hashPassword;
        user.passwordSalt = salt;
        return user.save();
    })
}