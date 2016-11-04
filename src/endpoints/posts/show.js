var models = require("../../models")
module.exports = function* (id){
    var post = yield models.posts.findById({
        _id:id
    }).populate("app user files")
    if(!post) return Promise.reject("post-not-found")
    if(post.user.isSuspended) return Promise.reject("this-user-is-suspended");
    return post;
}