var models = require("../../models")
var isValidDateString = require("../../utils/isValidDateString")
var getSinceMaxDateObject = require("../../utils/getSinceMaxDateObject")
module.exports = async function (token,sinceDate,maxDate,limit) {
    if (sinceDate && !isValidDateString(sinceDate)) throw "invalid-sinceDate"
    if (maxDate && !isValidDateString(maxDate)) throw "invalid-maxDate"
    if (isFinite(limit)) {
        if (limit < 1) throw "invalid-limit"
    } else limit = 100
    var notifications = await models.notifications.find({
        isRead:false,
        receiveUser:token.user.id,
        createdAt:getSinceMaxDateObject(sinceDate,maxDate)
    }).populate("targetApp targetUser targetPost").sort('-createdAt').limit(limit)
    return notifications
}