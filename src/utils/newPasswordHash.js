var crypto = require("crypto")
module.exports = function(screenName){
    var salthash = crypto.createHash("sha512");
    salthash.update("kyoppiesalthash-"+screenName+Date.now())
    return salthash.digest("hex")
}
