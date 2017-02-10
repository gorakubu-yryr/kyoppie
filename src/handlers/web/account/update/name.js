var main = require("../../../../endpoints/account/update/name")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.name
    ),this)
}
