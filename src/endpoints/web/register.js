var models = require("../../models")
var isValidScreenName = require("../../utils/isValidScreenName")
module.exports = function* (requestToken,name,screenName,password) {
    // バリデーション
    if (!requestToken) return Promise.reject("require-requestToken")
    if (!name || typeof name !== "string") return Promise.reject("require-name")
    if (!screenName || typeof screenName !== "string") return Promise.reject("require-screenName")
    if (!password || typeof password !== "string") return Promise.reject("require-password")
    if (name.length<1 || name.length > 20) return Promise.reject("invalid-name")
    if (!isValidScreenName(screenName)) return Promise.reject("invalid-screenName")
    // リクエストトークンを探す
    var request_token = yield models.request_tokens.findOne({
        token:requestToken
    }).populate("app")
    if (!request_token) return Promise.reject("requestToken-invalid")
    // Webじゃなかったら返す
    if (!request_token.app.isWeb) return Promise.reject("this-api-is-web-only")
    // 既存ユーザーがいないか確認する
    var res = yield models.users.findOne({screenNameLower:screenName.toLowerCase()})
    if (res) return Promise.reject("duplicate-screenName")
    // userのもろもろをやる
    var user = new models.users()
    user.name = name
    user.screenName = screenName
    user.screenNameLower = screenName.toLowerCase()
    user.rulesAgree = true
    user.setPassword(password)
    yield user.save()
    // PINコードを作成
    var pin_code = new models.pin_codes()
    pin_code.app = request_token.app
    pin_code.request_token = request_token.id
    pin_code.user = user
    return yield pin_code.save()
}