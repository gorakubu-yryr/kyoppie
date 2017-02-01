var main = require("../../../endpoints/web/rules_agree_period")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
    ),this)
}