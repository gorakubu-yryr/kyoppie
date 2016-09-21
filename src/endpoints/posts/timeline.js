var models = require("../../models")
module.exports = function(token){
    return models.posts.find({
        user:token.user.id
    }).populate("app user").sort('-createdAt')
}