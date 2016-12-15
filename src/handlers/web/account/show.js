var main = require("../../../endpoints/account/show")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token
    ),this)
}
