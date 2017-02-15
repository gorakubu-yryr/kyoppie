var models = require("../../models")
var getSinceMaxObject = require("../../utils/getSinceMaxObject")
module.exports = async function (token,sinceId,maxId,limit) {
    if (isFinite(limit)) {
        if (limit < 1) throw "invalid-limit"
    } else limit = 100
    var notifications = await models.notifications.find({
        isRead:false,
        receiveUser:token.user.id,
        id:getSinceMaxObject(sinceId,maxId)
    }).populate("targetApp targetUser targetPost").sort('-createdAt').limit(limit)
    return notifications
}