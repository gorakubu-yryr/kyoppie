exports.up = function(models){
    return models.notifications.find({
        isRead:{$exists:false}
    }).then(function(notifications){
        var promises = [];
        notifications.forEach(function(notification){
            notification.isRead = false;
            promises.push(notification.save());
        })
        return Promise.all(promises)
    })
}