var main = require("../../../endpoints/account/update_name")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.name
    ),this)
}
