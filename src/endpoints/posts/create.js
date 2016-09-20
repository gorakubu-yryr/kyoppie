var models = require("../../models")
module.exports = function(token,text){
    return new Promise(function(resolve,reject){
        // validate
        if(!text) return reject("text-is-require")
        var post = new models.posts();
        post.user = user.id;
        post.text = text;
        post.save.then(resolve,reject);
    })
}