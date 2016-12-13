var rndstr = require("rndstr")
module.exports = function(){
    return rndstr({
        length:64,
        chars:'0-9a-zA-Z_'
    })
}