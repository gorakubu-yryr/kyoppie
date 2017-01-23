var main = require("../../../endpoints/applications/change_key")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.id
    ),this)
}
