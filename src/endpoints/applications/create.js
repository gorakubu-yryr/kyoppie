var models = require("../../models")
var newApplicationKey = require("../../utils/newApplicationKey")
module.exports = function(user,name,isWeb = false){
    return new Promise(function(resolve,reject){
        if(!name) return reject("name-is-require");
        var app = new models.apps();
        app.appKey = newApplicationKey();
        app.user = user.id;
        app.name = name;
        app.save(function(err){
            if(err) return reject(err);
            resolve(app.toResponseObject());
        })
    });
}