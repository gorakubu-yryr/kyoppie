var main = require("../../../endpoints/posts/show")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.request.query.id
    ),this)
}
