var main = require("../../../endpoints/web/rules_agree_period")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
    ),this)
}