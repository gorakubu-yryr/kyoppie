var main = require("../../../endpoints/posts/timeline")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.query.sinceDate,
        this.request.query.maxDate,
        this.request.query.limit
    ),this)
}