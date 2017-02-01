var models = require("../../models")
var getHashedPassword = require("../../utils/getHashedPassword")
module.exports = async function (requestToken,screenName,password) {
    if (!requestToken) return Promise.reject("require-requestToken")
    if (!screenName || typeof screenName !== "string") return Promise.reject("require-screenName")
    if (!password || typeof password !== "string") return Promise.reject("require-password")
    var request_token = await models.request_tokens.findOne({token:requestToken})
    if (!request_token) return Promise.reject("requestToken-invalid")
    var user = await models.users.findOne({screenNameLower:screenName.toLowerCase()})
    if (!user) return Promise.reject("user-not-found")
    var salt = user.passwordSalt
    var hashPassword = getHashedPassword(password,salt)
    if (hashPassword != user.password) {
        return Promise.reject("invalid-password")
    }
    var pin_code = new models.pin_codes()
    pin_code.app = request_token.app
    pin_code.request_token = request_token.id
    pin_code.user = user
    return await pin_code.save()
}