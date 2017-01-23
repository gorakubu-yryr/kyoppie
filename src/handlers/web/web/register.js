var main = require("../../../endpoints/web/register")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.request.body.requestToken,
        this.request.body.name,
        this.request.body.screenName,
        this.request.body.password
    ),this)
}