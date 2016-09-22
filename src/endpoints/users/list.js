var models = require("../../models")
module.exports = function(){
    return models.users.find().sort("createdAt");
}
