exports.up = function(models){
    // write your migrate
    return models.users.find().then(function(users){
        var promises = []
        users.forEach(function(user){
            var promise = models.follows.find({
                fromUser:user.id
            }).then(function(follows){
                user.followingCount = follows.length;
                return user.save();
            })
            promises.push(promise);
        })
        return Promise.all(promises)
    });
}