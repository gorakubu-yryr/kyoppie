var models = require("../../models")
module.exports = function(token,name,isWeb = false){
    if(!name) return Promise.reject("name-is-require");
    var app = new models.apps();
    app.user = token.user.id;
    app.name = name;
    app.isWeb = isWeb;
    return app.save();
}