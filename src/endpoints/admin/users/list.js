var models = require("../../../models")
module.exports = function* (){
    return yield models.users.find().sort("createdAt");
}
