var models = require("../../models")
module.exports = function(token){
    return Promise.resolve(token.user)
}
