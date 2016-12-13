var main = require("../../../endpoints/applications/my")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token
    ),this)
}