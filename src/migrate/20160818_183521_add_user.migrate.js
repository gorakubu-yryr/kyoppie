var register = require("../endpoints/web/register_")
exports.up = function(models){
    // write your migrate
    return register("admin","admin").then(function(user){
        if(!user) return new Promise.reject("user is not create")
        return models.users.findOne({_id:models.mongoose.Types.ObjectId(user.id)})
    }).then(function(user){
        if(!user) return new Promise.reject("user is not create")
        user.adminLevel=-1; // all
        return user.save();
    })
}