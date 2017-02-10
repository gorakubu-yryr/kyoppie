var main = require("../../../endpoints/users/search")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.request.query.text
    ),this)
}
