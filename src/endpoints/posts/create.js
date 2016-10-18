var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = function(token,text,files){
    // validate
    if(!text) return Promise.reject("text-is-require")
    var post = new models.posts();
    post.app = token.app;
    post.user = token.user;
    post.user.postsCount++;
    post.text = text.replace(/\n+/g,"\n");
    var file_ids = files.split(",").map(function(id){
        if(id.length != 24) return undefined;
        return id;
    });
    console.log(file_ids);
    return models.files.find({
        _id:{$in:file_ids}
    }).then(function(files){
        console.log(files)
        if(files.length > 1) return Promise.reject("file-too-many")
        post.files = files;
        var promises = [
            post.save(),
            post.user.save(),
            models.follows.find({toUser:token.user.id})
        ]
        for(var i = 0;i < files.length;i++){ // ファイルがどこかで使われているフラグを立てる
            if(!files[i].isUse){
                files[i].isUse = true;
                promises.push(files[i].save())
            }
        }
        return Promise.all(promises);
    }).then(function(_){
        var post = _[0]
        var redis = getRedisConnection();
        redis.publish("kyoppie:posts-timeline:"+token.user.id,post.id)
        _[2].forEach(function(following){
            redis.publish("kyoppie:posts-timeline:"+following.fromUser,post.id)
        })
        redis.publish("kyoppie:posts-public_timeline",post.id);
        redis.quit();
        return Promise.resolve(post)
    });
}