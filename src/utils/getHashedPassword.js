var crypto = require("crypto")
module.exports = function(password,salt){
    var hash = crypto.createHash("sha512");
    hash.update("kyoppie-"+salt+"-"+password);
    return hash.digest("hex");
}
