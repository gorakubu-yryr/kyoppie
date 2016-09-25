var models = require("../../models")
module.exports = function(screenName,id){
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    var promise;
    if(screenName) {
        promise = models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        promise = models.users.findOne({_id:models.mongoose.Types.ObjectId(id)})
    }
    return promise.then(function(user){
        if(!user) return Promise.reject("user-not-found")
        return models.follows.find({
            toUser:user.id
        }).populate("fromUser")
    }).then(function(follows){
        var following_users = [];
        follows.forEach(function(follow){
            following_users.push(follow.fromUser);
        })
        return Promise.resolve(following_users)
    })
}
