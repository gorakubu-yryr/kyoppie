var main = require("../../../endpoints/about/reserved_screen_name")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
    ),this)
}
