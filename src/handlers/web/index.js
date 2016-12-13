var main = require("../../endpoints/index")
var wrap = require("./wrap")

module.exports = function* () {
    yield wrap(main(),this)
}