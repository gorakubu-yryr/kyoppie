var main = require("../../../endpoints/posts/public_timeline");
var wrap = require("../wrap")

module.exports = function *(){
    yield wrap(main(
    ),this)
}