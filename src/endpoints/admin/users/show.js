var models = require("../../../models")
module.exports = function* (token,screenName,id){
    if(!token.user.adminFlag.userMng) return Promise.reject("no-permission")
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user
    if(screenName) {
        user = yield models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = yield models.users.findOne({_id:models.mongoose.Types.ObjectId(id)})
    }
    if(!user) return Promise.reject("user-not-found")
    return user
}
