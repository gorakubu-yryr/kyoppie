exports.up = models =>
    models.posts.where('repostCount')
    .exists(false)
    .then(function(posts) {
        var promises = []
        posts.forEach(post => {
            post.repostCount = 0
            promises.push(post.save())
        })
        return Promise.all(promises)
    })