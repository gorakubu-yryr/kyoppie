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
            }
            // generate accesstoken
            // の前にWebのappを取得
            models.apps.findOne({
                isWeb:true
            },function(err,app){
                if(err) return reject(err);
                if(!app) return reject("please-run-setup-script")
                var token = new models.access_tokens()
                token.userId = res.user;
                token.appId = app.id;
                token.save(function(err){
                    resolve({
                        token:token.token,
                        user:res
                    });
                })
            })
       }).catch(reject)
    })
}