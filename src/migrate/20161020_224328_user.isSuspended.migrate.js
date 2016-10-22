exports.up = function(models){
    // write your migrate
    return models.users.find({isSuspended:{$exists:false}}).then(function(users){
        var promises = [];
        users.forEach(function(user){
            user.isSuspended = !!user.isSuspended;
            promises.push(user.save())
        })
        return Promise.all(promises)
    })
}