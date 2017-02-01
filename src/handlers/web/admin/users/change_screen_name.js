var main = require("../../../../endpoints/admin/users/change_screen_name")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.id,
        this.request.body.newScreenName
    ),this)
}
