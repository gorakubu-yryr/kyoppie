var models = require("../../models")
var newApplicationKey = require("../../utils/newApplicationKey")
module.exports = async function (token,id) {
    var app = await models.apps.findById(id)
    if (app.user != token.user.id) {
        return Promise.reject("damedesu")
    }
    app.appKey = newApplicationKey()
    app.appSecret = newApplicationKey()
    // とりあえずappKeyとappSecretを変えてセーブしてしまえばこれ以降新たにaccess_token等が作られることはない
    await app.save()
    // TODO: access_tokenを完全に削除してしまうといろいろ面倒くさいことになりそうなので削除フラグを立てるだけにしたほうがいいのでは
    await models.access_tokens.remove({app:app.id})
    await models.request_tokens.remove({app:app.id})
    await models.signatures.remove({app:app.id})
    await models.pin_codes.remove({app:app.id})
    return "ok"
}