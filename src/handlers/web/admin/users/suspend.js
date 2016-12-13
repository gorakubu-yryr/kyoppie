var main = require("../../../../endpoints/admin/users/suspend")
var wrap = require("../../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token,
        this.request.body.id
    ),this)
}
