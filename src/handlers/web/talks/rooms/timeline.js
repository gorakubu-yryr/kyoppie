var main = require("../../../../endpoints/talks/rooms/timeline")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.query.id
    ),this)
}