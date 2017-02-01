var main = require("../../../endpoints/web/rules_agree")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.password
    ),this)
}