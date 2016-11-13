var models = require("../../../models")
module.exports = function* (token,id,password){
    if(!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if(!id) return Promise.reject("id-is-required")
    if(!password) return Promise.reject("password-is-required")
    var user = yield models.users.findById(id);
    if(!user) return Promise.reject("user-not-found")
    user.setPassword(password);
    yield user.save();
    return "ok";
}