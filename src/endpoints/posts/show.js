var models = require("../../models")
module.exports = function(id){
    return models.posts.findById({
        _id:id
    }).populate("app user files")
}