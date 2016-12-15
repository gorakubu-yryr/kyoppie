var main = require("../../../../endpoints/talks/rooms/create")
var wrap = require("../../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.name
    ),this)
}