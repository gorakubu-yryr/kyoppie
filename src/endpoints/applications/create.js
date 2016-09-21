var models = require("../../models")
module.exports = function(user,name,isWeb = false){
    if(!name) return Promise.reject("name-is-require");
    var app = new models.apps();
    app.user = user.id;
    app.name = name;
    return app.save();
}