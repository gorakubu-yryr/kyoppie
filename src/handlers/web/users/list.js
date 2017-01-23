var main = require("../../../endpoints/users/list")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
    ),this)
}
