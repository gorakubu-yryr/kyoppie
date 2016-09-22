var models = require("../../models")
module.exports = function(token,name,isWeb = false){
    if(!name) return Promise.reject("name-is-require");
    return models.apps.findOne({name}).then(function(app){
        if(app) return Promise.reject("this-name-is-already-used")
        app = new models.apps();
        app.user = token.user.id;
        app.name = name;
        app.isWeb = isWeb;
        return app.save();
    })
}