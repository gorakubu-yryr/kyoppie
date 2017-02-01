var models = require("../../models")
var isValidDateString = require("../../utils/isValidDateString")
var getSinceMaxDateObject = require("../../utils/getSinceMaxDateObject")
module.exports = async function (token,sinceDate,maxDate,limit) {
    if (sinceDate && !isValidDateString(sinceDate)) return Promise.reject("invalid-sinceDate")
    if (maxDate && !isValidDateString(maxDate)) return Promise.reject("invalid-maxDate")
    if (isFinite(limit)) {
        if (limit < 1) return Promise.reject("invalid-limit")
    } else limit = 100
    var notifications = await models.notifications.find({
        isRead:false,
        receiveUser:token.user.id,
        createdAt:getSinceMaxDateObject(sinceDate,maxDate)
    }).populate("targetApp targetUser targetPost").sort('-createdAt').limit(limit)
    return notifications
}