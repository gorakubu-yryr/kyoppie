var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = function* (token,text,files){
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
    var files = yield models.files.find({
        _id:{$in:file_ids}
    })
    if(files.length > 1) return Promise.reject("file-too-many")
    post.files = files;
    // 投稿を保存
    yield post.save()
    yield post.user.save()
    // ファイルがどこかで使われているフラグを立てる
    for(var i = 0;i < files.length;i++){
        if(!files[i].isUse){
            files[i].isUse = true;
            yield files[i].save()
        }
    }
    // タイムラインのストリーミングに垂れ流す
    var following = yield models.follows.find({toUser:token.user.id})
    var redis = getRedisConnection();
    redis.publish("kyoppie:posts-timeline:"+token.user.id,post.id)
    following.forEach(function(following){
        redis.publish("kyoppie:posts-timeline:"+following.fromUser,post.id)
    })
    redis.publish("kyoppie:posts-public_timeline",post.id);
    redis.quit();
    return post
}