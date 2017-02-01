var main = require("../../endpoints/index")
var wrap = require("./wrap")

module.exports = async function () {
    await wrap(main(),this)
}