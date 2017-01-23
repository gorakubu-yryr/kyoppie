var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = async function (token,text,files) {
    // validate
    if (!text) return Promise.reject("text-is-require")
    if (!files) files = ""
    var post = new models.posts()
    post.app = token.app
    post.user = token.user
    post.user.postsCount++
    post.text = text.replace(/\n+/g,"\n")
    var file_ids = files.split(",").map(function(id) {
        if (id.length != 24) return undefined
        return id
    })
    files = await models.files.find({
        _id:{$in:file_ids}
    })
    if (files.length > 1) return Promise.reject("file-too-many")
    post.files = files
    // 投稿を保存
    await post.save()
    await post.user.save()
    // ファイルがどこかで使われているフラグを立てる
    for (var i = 0;i < files.length;i++) {
        if (!files[i].isUse) {
            files[i].isUse = true
            await files[i].save()
        }
    }
    // リプライをチェック
    var re = /(^| |　)@([A-Za-z0-9_]+)/g
    var match
    var users = []
    while (match = re.exec(post.text)) {
        if (-1 === users.indexOf(match[2])) users.push(match[2])
    }
    users = await models.users.find({screenName:{$in:users}})
    var promises = []
    users.forEach(function(user) {
        var notification = new models.notifications
        notification.type = "reply"
        notification.receiveUser = user.id
        notification.targetUser = post.user.id
        notification.targetPost = post.id
        promises.push(notification.save().then(function() {
            console.log(notification)
            notification.publish()
        }))
    })
    await Promise.all(promises)
    // タイムラインのストリーミングに垂れ流す
    var following = await models.follows.find({toUser:token.user.id})
    var redis = getRedisConnection()
    redis.publish("kyoppie:posts-timeline:"+token.user.id,post.id)
    following.forEach(function(following) {
        redis.publish("kyoppie:posts-timeline:"+following.fromUser,post.id)
    })
    redis.publish("kyoppie:posts-public_timeline",post.id)
    redis.quit()
    return post
}