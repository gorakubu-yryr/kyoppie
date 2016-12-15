var main = require("../../../endpoints/applications/change_key")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.id
    ),this)
}
