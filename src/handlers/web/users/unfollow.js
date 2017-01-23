var main = require("../../../endpoints/users/unfollow")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.token,
        this.request.body.screenName,
        this.request.body.id
    ),this)
}
