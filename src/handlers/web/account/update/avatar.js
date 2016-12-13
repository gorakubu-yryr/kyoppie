var main = require("../../../../endpoints/account/update/avatar")
var wrap = require("../../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token,
        this.request.body.file
    ),this)
}
