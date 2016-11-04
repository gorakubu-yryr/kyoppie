var models = require("../../models")
module.exports = function* (token,screenName,id){
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user;
    if(screenName) {
        user = yield models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = yield models.users.findOne({_id:models.mongoose.Types.ObjectId(id)})
    }
    if(!user) return Promise.reject("user-not-found")
    if(user.isSuspended) return Promise.reject("this-user-is-suspended");
    if(token.user.id == user.id) return Promise.reject("私が私を見つめてました")
    var follow = yield models.follows.findOne({
        fromUser:token.user.id,
        toUser:user.id
    })
    if(follow) return Promise.reject("already-follow")
    follow = new models.follows;
    follow.fromUser = token.user.id;
    follow.toUser = user.id;
    yield follow.save();
    token.user.followingCount += 1;
    user.followersCount += 1;
    yield token.user.save()
    yield user.save()
    return Promise.resolve("ok")
}
