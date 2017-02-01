var main = require("../../../endpoints/applications/create")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.name
    ),this)
}