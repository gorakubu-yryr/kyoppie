var models = require("../../models")
module.exports = async function (token,id) {
    var notification = await models.notifications.findById(id).populate("targetApp targetUser targetPost")
    if (!notification) return Promise.reject("not-found")
    if (notification.receiveUser != token.user.id) return Promise.reject("not-found")
    return notification
}