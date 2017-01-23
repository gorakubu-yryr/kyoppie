var main = require("../../../endpoints/account/change_password")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.password
    ),this)
}
