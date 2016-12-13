exports.up = function(models) {
    // write your migrate
    return models.users.find({
        adminLevel:-1
    }).then(function(users) {
        var promises = []
        users.forEach(function(user) {
            user.adminFlag.fileServer = true
            promises.push(user.save())
        })
        return Promise.all(promises)
    })
}