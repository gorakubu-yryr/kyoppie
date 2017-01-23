var main = require("../../../endpoints/notifications/list")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.query.sinceDate,
        this.request.query.maxDate,
        this.request.query.limit
    ),this)
}