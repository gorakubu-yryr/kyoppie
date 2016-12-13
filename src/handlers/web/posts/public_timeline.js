var main = require("../../../endpoints/posts/public_timeline")
var wrap = require("../wrap")

module.exports = function *() {
    yield wrap(main(
        this.request.query.sinceDate,
        this.request.query.maxDate,
        this.request.query.limit
    ),this)
}