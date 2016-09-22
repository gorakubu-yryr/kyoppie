var models = require("../../models")
module.exports = function(token,screenName,id){
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    var promise;
    if(screenName) {
        promise = models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        promise = models.users.findOne({_id:models.mongoose.Types.ObjectId(id)})
    }
    return promise.then(function(user){
        if(!user) return Promise.reject("user-not-found")
        return models.follows.findOne({
            fromUser:token.user.id,
            toUser:user.id
        }).then(function(follow){
            if(follow) return Promise.reject("already-follow")
            follow = new models.follows;
            follow.fromUser = token.user.id;
            follow.toUser = user.id;
            return follow.save();
        })
    }).then(function(follow){
        return Promise.resolve("ok")
    })
}
