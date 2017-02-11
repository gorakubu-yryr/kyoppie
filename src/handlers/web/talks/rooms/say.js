var main = require("../../../endpoints/talks/rooms/say")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.id,
        this.request.body.text,
        this.request.body.files
    ),this)
}