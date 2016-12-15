var main = require("../../../../../endpoints/talks/rooms/members/add")
var wrap = require("../../../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.id,
        this.request.body.userId
    ),this)
}