var main = require("../../../endpoints/posts/show");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.request.query.id
    ),this);
}
