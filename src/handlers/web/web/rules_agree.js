var main = require("../../../endpoints/web/rules_agree")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.password
    ),this)
}