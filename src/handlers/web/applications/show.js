var main = require("../../../endpoints/applications/show")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.query.id
    ),this)
}
