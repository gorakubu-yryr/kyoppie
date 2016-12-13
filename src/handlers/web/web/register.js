var main = require("../../../endpoints/web/register")
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.request.body.requestToken,
        this.request.body.name,
        this.request.body.screenName,
        this.request.body.password
    ),this)
}