exports.up = function(models){
    return models.users.find().then(function(users){
        var promises = []
        users.forEach(function(user){
            var promise = models.follows.findOne({
                fromUser:user.id,
                toUser:user.id
            }).then(function(following){
                if(!following) return
                return models.follows.findByIdAndRemove(following.id).then(function(){
                    user.followingCount--
                    user.followersCount--
                    return user.save()
                })
            })
            promises.push(promise)
        })
        return Promise.all(promises)
    })
}