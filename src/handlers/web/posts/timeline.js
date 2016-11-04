var main = require("../../../endpoints/posts/timeline");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token
    ),this)
}