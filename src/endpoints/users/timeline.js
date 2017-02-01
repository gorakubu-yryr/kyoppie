var models = require("../../models")
module.exports = async function (screenName,id) {
    if (!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()}).populate("avatar")
    } else {
        user = await models.users.findById(id).populate("avatar")
    }
    if (!user) return Promise.reject("user-not-found")
    if (user.isSuspended) return Promise.reject("this-user-is-suspended")
    var posts = await models.posts.find({
        user:user.id
    }).populate("app files").sort('-createdAt')
    posts = posts.map(function(post) {
        post.user = user
        return post
    })
    return posts
}
