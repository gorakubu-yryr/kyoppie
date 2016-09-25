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
        if(token.user.id == user.id) return Promise.reject("私が私を見つめてました")
        return models.follows.findOne({
            fromUser:token.user.id,
            toUser:user.id
        }).then(function(follow){
            if(follow) return Promise.reject("already-follow")
            follow = new models.follows;
            follow.fromUser = token.user.id;
            follow.toUser = user.id;
            return follow.save();
        }).then(function(){
            token.user.followingCount += 1;
            user.followersCount += 1;
            return Promise.all([
                token.user.save(),
                user.save()
            ])
        })
    }).then(function(follow){
        return Promise.resolve("ok")
    })
}
