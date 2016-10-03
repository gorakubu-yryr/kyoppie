var models = require("../../models")
module.exports = function(token){
    return models.posts.find().populate("app user").sort('-createdAt')
}