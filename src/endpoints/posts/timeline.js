var models = require("../../models")
module.exports = function(token){
    return models.posts.find({
        user:token.user.id
    }).populate("user").sort('-createdAt')
}