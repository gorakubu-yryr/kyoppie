var models = require("../../../models")
var getHashedPassword = require("../../../utils/getHashedPassword")
var newPasswordHash = require("../../../utils/newPasswordHash")
module.exports = function* (token,id,password){
    if(!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if(!id) return Promise.reject("id-is-required")
    if(!password) return Promise.reject("password-is-required")
    var user = yield models.users.findById(id);
    if(!user) return Promise.reject("user-not-found")
    var salt = newPasswordHash(user.screenName)
    var hashPassword = getHashedPassword(password,salt)
    user.password = hashPassword;
    user.passwordSalt = salt;
    yield user.save();
    return "ok";
}