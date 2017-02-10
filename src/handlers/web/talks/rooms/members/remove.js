var main = require("../../../../../endpoints/talks/rooms/members/remove")
var wrap = require("../../../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.id,
        this.request.body.userId
    ),this)
}