var models = require("../../models")
module.exports = function(screenName,id){
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    var promise;
    var user;
    if(screenName) {
        promise = models.users.findOne({screenNameLower:screenName.toLowerCase()}).populate("avatar")
    } else {
        promise = models.users.findOne({_id:models.mongoose.Types.ObjectId(id)}).populate("avatar")
    }
    return promise.then(function(user_){
        user = user_;
        if(!user) return Promise.reject("user-not-found")
        if(user.isSuspended) return Promise.reject("this-user-is-suspended")
        return models.posts.find({
            user:user.id
        }).populate("app files").sort('-createdAt')
    }).then(function(posts){
        posts = posts.map(function(post){
            post.user = user;
            return post;
        })
    })
}
