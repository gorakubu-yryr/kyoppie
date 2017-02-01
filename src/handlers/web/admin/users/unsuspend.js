var main = require("../../../../endpoints/admin/users/unsuspend")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.id
    ),this)
}
