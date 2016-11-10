var models = require("../../models")
var newApplicationKey = require("../../utils/newApplicationKey")
module.exports = function* (token,id){
    var app = yield models.apps.findById(id)
    if(app.user != token.user.id){
        return Promise.reject("damedesu")
    }
    app.appKey = newApplicationKey();
    app.appSecret = newApplicationKey();
    // とりあえずappKeyとappSecretを変えてセーブしてしまえばこれ以降新たにaccess_token等が作られることはない
    yield app.save();
    // TODO: access_tokenを完全に削除してしまうといろいろ面倒くさいことになりそうなので削除フラグを立てるだけにしたほうがいいのでは
    yield models.access_tokens.remove({app:app.id})
    yield models.request_tokens.remove({app:app.id})
    yield models.signatures.remove({app:app.id})
    yield models.pin_codes.remove({app:app.id})
    return "ok"
}