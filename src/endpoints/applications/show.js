var models = require("../../models")
module.exports = function(token,id){
    return models.apps.findById({
        _id:id
    }).then(function(app){
        if(app.user != token.user.id){
            return Promise.reject("damedesu")
        }
        return Promise.resolve(app);
    })
}