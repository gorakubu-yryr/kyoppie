var main = require("../../../../endpoints/admin/users/show")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.query.screenName,
        this.request.query.id
    ),this)
}
