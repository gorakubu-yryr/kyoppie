var main = require("../../../endpoints/users/timeline");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.request.query.screenName,
        this.request.query.id
    ),this);
}
