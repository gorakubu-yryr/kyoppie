var main = require("../../../../endpoints/talks/rooms/list")
var wrap = require("../../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token
    ),this)
}