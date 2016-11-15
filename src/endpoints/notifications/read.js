var models = require("../../models")
module.exports = function* (token,id){
    var notification = yield models.notifications.findById(id).populate("targetApp targetUser targetPost");
    if(!notification) return Promise.reject("not-found");
    if(notification.receiveUser != token.user.id) return Promise.reject("not-found");
    notification.isRead = true;
    yield notification.save();
    return "ok"
}