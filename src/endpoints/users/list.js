var models = require("../../models")
module.exports = function(){
    return models.users.find({isSuspended:false}).sort("createdAt");
}
