var main = require("../../../endpoints/files/upload")
var wrap = require("../wrap")

module.exports = async function () {
    await wrap(main(
        this.file.buffer
    ),this)
}