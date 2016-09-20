var models = require("../../models")
module.exports = function(token){
    return new Promise(function(resolve,reject){
        resolve(token.user)
    })
}
