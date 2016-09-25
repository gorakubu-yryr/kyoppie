exports.up = function(models){
    // write your migrate
    return models.users.find().then(function(users){
        var promises = []
        users.forEach(function(user){
            var promise = models.follows.find({
                toUser:user.id
            }).then(function(follows){
                user.followersCount = follows.length;
                return user.save();
            })
            promises.push(promise);
        })
        return Promise.all(promises)
    });
}