var main = require("../../../../endpoints/admin/site_config/set")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.name,
        this.request.body.content
    ),this)
}
