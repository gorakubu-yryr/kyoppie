var crypto = require("crypto")
var models = require("../../models")
var getHashedPassword = require("../../utils/getHashedPassword")
var newPasswordHash = require("../../utils/newPasswordHash")
module.exports = function(screenName,password){
    return new Promise(function(resolve,reject){
        // validate
        if(!screenName && typeof screenName !== "string") return reject("require-screenName")
        if(!password && typeof password !== "string") return reject("require-password")
        models.users.findOne({screenNameLower:screenName.toLowerCase()}).then(function(res){
            if(res){
                return reject("duplicate-screenName")
            }
            var salt = newPasswordHash(screenName)
            var hashPassword = getHashedPassword(password,salt)
            var user = new models.users()
            user.screenName = screenName;
            user.screenNameLower = screenName.toLowerCase();
            user.password = hashPassword;
            user.passwordSalt = salt;
            user.save(function(err){
                resolve(user);
            });
       }).catch(reject)
    })
}