var main = require("../../../endpoints/applications/my")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token
    ),this)
}