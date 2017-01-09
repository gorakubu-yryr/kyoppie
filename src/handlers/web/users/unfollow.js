var main = require("../../../endpoints/users/unfollow")
var wrap = require("../wrap")

module.exports = function* () {
    yield wrap(main(
        this.token,
        this.request.body.screenName,
        this.request.body.id
    ),this)
}
