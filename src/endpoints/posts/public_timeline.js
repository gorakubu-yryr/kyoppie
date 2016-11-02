var models = require("../../models")
module.exports = function* (){
    var users = yield models.users.find({isSuspended:true}).select("_id")
    users = users.map(function(user){
        return user._id;
    })
    posts = yield models.posts.find({user:{$ne:users}}).populate("app user user.avatar files").sort('-createdAt');
    return posts;
}