var main = require("../../../../endpoints/admin/users/show")
var wrap = require("../../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token,
        this.request.query.screenName,
        this.request.query.id
    ),this)
}
