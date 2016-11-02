var models = require("../../models")
module.exports = function(id){
    return models.posts.findById({
        _id:id
    }).populate("app user user.avatar files").then(function(post){
        if(!post) return Promise.reject("post-not-found")
        if(post.user.isSuspended) return Promise.reject("this-user-is-suspended");
        return Promise.resolve(post);
    })
}