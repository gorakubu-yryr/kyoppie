var models = require("../../models")
module.exports = function(screenName,password) {
    // validate
    if (!screenName && typeof screenName !== "string") throw "require-screenName"
    if (!password && typeof password !== "string") throw "require-password"
    return models.users.findOne({screenNameLower:screenName.toLowerCase()}).then(function(res) {
        if (res) throw "duplicate-screenName"
        var user = new models.users()
        user.screenName = screenName
        user.screenNameLower = screenName.toLowerCase()
        user.rulesAgree = true
        user.setPassword(password)
        return user.save()
    })
}