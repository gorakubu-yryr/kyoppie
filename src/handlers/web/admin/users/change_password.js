var main = require("../../../../endpoints/admin/users/change_password")
var wrap = require("../../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.id,
        this.request.body.password
    ),this)
}
