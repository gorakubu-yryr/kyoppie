var models = require("../../models")
module.exports = async function (token,id) {
    var notification = await models.notifications.findById(id).populate("targetApp targetUser targetPost")
    if (!notification) throw "not-found"
    if (notification.receiveUser != token.user.id) throw "not-found"
    return notification
}