exports.up = function(models){
    // write your migrate
    return models.apps.find({
        isWeb:true
    }).then(function(apps){
        var promises = [];
        apps.forEach(function(app){
            app.isAdmin = true;
            promises.push(app.save())
        })
        return Promise.all(promises)
    })
}