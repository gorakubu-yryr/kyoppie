var models = require("../../models")
var getHashedPassword = require("../../utils/getHashedPassword")
var newPasswordHash = require("../../utils/newPasswordHash")
module.exports = function(token,password){
    var user = token.user;
    var salt = newPasswordHash(user.screenName)
    var hashPassword = getHashedPassword(password,salt)
    user.password = hashPassword;
    user.passwordSalt = salt;
    return user.save()
}
