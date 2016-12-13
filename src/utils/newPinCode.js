var rndstr = require("rndstr")
module.exports = function() {
    return rndstr({
        length:8,
        chars:'0-9'
    })
}