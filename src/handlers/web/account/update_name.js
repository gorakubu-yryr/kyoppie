var main = require("../../../endpoints/account/update_name");
var wrap = require("../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token,
        this.request.body.name
    ),this);
}
