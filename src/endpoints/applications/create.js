var models = require("../../models")
module.exports = function(user,name,isWeb = false){
    return new Promise(function(resolve,reject){
        if(!name) return reject("name-is-require");
        var app = new models.apps();
        app.user = user.id;
        app.name = name;
        return app.save();
    });
}