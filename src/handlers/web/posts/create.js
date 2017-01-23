var main = require("../../../endpoints/posts/create")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.text,
        this.request.body.files
    ),this)
}