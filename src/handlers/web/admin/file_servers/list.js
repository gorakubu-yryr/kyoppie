var main = require("../../../../endpoints/admin/file_servers/list")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token
    ),this)
}
