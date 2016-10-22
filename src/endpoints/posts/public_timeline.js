var models = require("../../models")
module.exports = function(){
    return models.users.find({isSuspended:true}).select("_id").then(function(users){
        users = users.map(function(user){
            return user._id;
        })
        return models.posts.find({user:{$ne:users}}).populate("app user files").sort('-createdAt');
    });
}