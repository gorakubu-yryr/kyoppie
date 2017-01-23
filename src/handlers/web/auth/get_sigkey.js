var main = require("../../../endpoints/auth/get_sigkey.js")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.request.body.appKey
    ),this)
}