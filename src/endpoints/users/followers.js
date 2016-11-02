var models = require("../../models")
module.exports = function(screenName,id){
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    var promise;
    if(screenName) {
        promise = models.users.findOne({screenNameLower:screenName.toLowerCase()}).populate("avatar")
    } else {
        promise = models.users.findOne({_id:models.mongoose.Types.ObjectId(id)}).populate("avatar")
    }
    return promise.then(function(user){
        if(!user) return Promise.reject("user-not-found")
        if(user.isSuspended) return Promise.reject("this-user-is-suspended")
        return models.follows.find({
            toUser:user.id
        }).populate("fromUser fromUser.avatar")
    }).then(function(follows){
        var following_users = [];
        follows.forEach(function(follow){
            if(!user.isSuspended) following_users.push(follow.fromUser);
        })
        return Promise.resolve(following_users)
    })
}
