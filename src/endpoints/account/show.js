var models = require("../../models")
module.exports = function* (token){
    return token.user;
}
