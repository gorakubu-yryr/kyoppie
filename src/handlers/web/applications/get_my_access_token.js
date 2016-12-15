var main = require("../../../endpoints/applications/get_my_access_token")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.id
    ),this)
}