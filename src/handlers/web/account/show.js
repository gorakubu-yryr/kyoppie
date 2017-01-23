var main = require("../../../endpoints/account/show")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token
    ),this)
}
