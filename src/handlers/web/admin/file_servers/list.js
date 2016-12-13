var main = require("../../../../endpoints/admin/file_servers/list")
var wrap = require("../../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token
    ),this)
}
