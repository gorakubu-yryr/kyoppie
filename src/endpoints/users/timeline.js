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
        return models.posts.find({
            user:user.id
        }).populate("app user").sort('-createdAt')
    })
}
