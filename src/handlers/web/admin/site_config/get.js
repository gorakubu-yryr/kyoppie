var main = require("../../../../endpoints/admin/site_config/get")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token
    ),this)
}
