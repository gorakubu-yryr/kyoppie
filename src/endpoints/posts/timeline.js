var models = require("../../models")
module.exports = function(token){
    return new Promise(function(resolve,reject){
        models.posts.find({
            user:token.user.id
        }).populate("user").then(resolve,reject)
    })
}