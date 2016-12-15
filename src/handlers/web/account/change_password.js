var main = require("../../../endpoints/account/change_password")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.password
    ),this)
}
