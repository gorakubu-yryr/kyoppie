var models = require("../../models")
module.exports = function* (){
    return yield models.users.find({isSuspended:false}).sort("createdAt")
}
