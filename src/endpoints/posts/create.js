var models = require("../../models")
module.exports = function(token,text){
    // validate
    if(!text) return Promise.reject("text-is-require")
    var post = new models.posts();
    post.app = token.app;
    post.user = token.user;
    post.text = text;
    return post.save()
}