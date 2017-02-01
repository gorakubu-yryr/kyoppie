var main = require("../../../endpoints/notifications/read")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.id
    ),this)
}
