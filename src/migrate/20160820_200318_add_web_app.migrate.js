var newApplicationKey = require("../utils/newApplicationKey");
exports.up = function(models){
    // write your migrate
    var app = new models.apps();
    app.name="web";
    app.appKey = newApplicationKey();
    app.appSecret = newApplicationKey();
    app.isWeb = true;
    return models.users.find({
        adminLevel:-1
    }).sort({createdAt:1}).limit(1).then(function(user){
        app.user = user.id;
        return app.save();
    })
}