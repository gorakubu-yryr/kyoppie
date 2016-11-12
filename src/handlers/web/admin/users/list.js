var main = require("../../../../endpoints/admin/users/list");
var wrap = require("../../wrap")

module.exports = function* (){
    yield wrap(main(
        this.token
    ),this);
}
