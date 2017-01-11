var main = require("../../../endpoints/users/search")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.request.query.text
    ),this)
}
