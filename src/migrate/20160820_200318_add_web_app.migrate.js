var fs = require("fs");
exports.up = function(models){
    // write your migrate
    var app = new models.apps();
    app.name="web";
    app.isWeb = true;
    var config;
    var configFilePath = __dirname+"/../../web_config.json";
    try{
        config = JSON.parse(fs.readFileSync(configFilePath));
    } catch (e){
        config = {};
    }
    config.appKey = app.appKey;
    config.appSecret = app.appSecret;
    fs.writeFileSync(configFilePath,JSON.stringify(config,null,4));
    return models.users.find({
        adminLevel:-1
    }).sort({createdAt:1}).limit(1).then(function(user){
        app.user = user.id;
        return app.save();
    })
}