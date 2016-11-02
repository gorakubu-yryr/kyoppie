var main = require("../../../endpoints/auth/get_access_token");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.request.body.appKey,
        this.request.body.appSecret,
        this.request.body.sigKey,
        this.request.body.pinCode,
        this.request.body.requestToken
    ),this)
}