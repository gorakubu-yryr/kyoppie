var main = require("../../../../endpoints/admin/file_servers/add")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.name,
        this.request.body.url
    ),this)
}
