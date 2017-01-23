var main = require("../../../../endpoints/admin/users/list")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token
    ),this)
}
