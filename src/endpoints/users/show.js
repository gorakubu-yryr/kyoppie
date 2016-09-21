var models = require("../../models")
module.exports = function(screenName,id){
    if(!screenName && !id) return Promise.reject("screenName-or-id-require")
    if(screenName) {
        return models.users.findOne({screenNameLower:screenName.toLowerCase()})
    } else {
        return models.users.findOne({_id:models.mongoose.Types.ObjectId(id)})
    }
}
