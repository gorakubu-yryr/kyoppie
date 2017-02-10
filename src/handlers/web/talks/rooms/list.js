var main = require("../../../../endpoints/talks/rooms/list")
var wrap = require("../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token
    ),this)
}