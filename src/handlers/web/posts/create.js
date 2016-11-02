var main = require("../../../endpoints/posts/create");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token,
        this.request.body.text,
        this.request.body.files
    ),this)
}