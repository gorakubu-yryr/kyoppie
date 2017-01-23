var models = require("../../models")
module.exports = async function (screenName,id) {
    if (!screenName && !id) return Promise.reject("screenName-or-id-require")
    var user
    if (screenName) {
        user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        user = await models.users.findById(id)
    }
    if (!user) return Promise.reject("user-not-found")
    if (user.isSuspended) return Promise.reject("this-user-is-suspended")
    var favorites = await models.favorites.find({
        user:user.id
    })
    var posts = favorites.map(function(favorite) {
        return favorite.post
    })
    posts = await models.posts.find({
        _id:{$in:posts}
    }).populate("user app files")
    return posts
}
