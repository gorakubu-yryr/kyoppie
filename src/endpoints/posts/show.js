var models = require("../../models")
module.exports = async function (id) {
    var post = await models.posts.findById(id).populate("app user files replyTo repostTo")
    if (!post) throw "post-not-found"
    if (post.user.isSuspended) throw "this-user-is-suspended"
    // remove noneed informations
    if (post.repostTo) {
        delete post.favoriteCount
        delete post.repostCount
    }
    return post
}