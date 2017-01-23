var models = require("../../models")
module.exports = async function (id) {
    var post = await models.posts.findById(id).populate("app user files")
    if (!post) return Promise.reject("post-not-found")
    if (post.user.isSuspended) return Promise.reject("this-user-is-suspended")
    return post
}