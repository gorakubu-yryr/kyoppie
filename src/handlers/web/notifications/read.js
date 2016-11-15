var main = require("../../../endpoints/notifications/read");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token,
        this.request.body.id
    ),this);
}
