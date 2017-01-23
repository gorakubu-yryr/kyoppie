var main = require("../../../../endpoints/account/update/avatar")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.file
    ),this)
}
