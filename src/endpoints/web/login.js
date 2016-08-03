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
            if(!res){
                return reject("not-found-user")
            }
            var salt = res.passwordSalt;
            var hashPassword = getHashedPassword(password,salt)
            if(hashPassword != res.password){
                return reject("invalid-password")
            } else {
                resolve(res)
            }
       }).catch(reject)
    })
}