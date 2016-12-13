var main = require("../../../endpoints/users/list")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
    ),this)
}
