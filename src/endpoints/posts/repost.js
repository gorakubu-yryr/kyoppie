var models = require("../../models")
var getRedisConnection = require("../../utils/getRedisConnection")
module.exports = async function (token,id) {
    // validate
    if (!id) throw "id-is-require"
    var post = await models.posts.findById(id)
    if (!post) throw "post-not-found"
    if (post.repostTo) throw "no-repost-repost"
    // put datas
    var repost = new models.posts()
    repost.app = token.app
    repost.user = token.user
    repost.repostTo = post.id
    repost.user.postsCount++
    // save
    await repost.save()
    await repost.user.save()
    // タイムラインのストリーミングに垂れ流す
    var following = await models.follows.find({toUser:token.user.id})
    var redis = getRedisConnection()
    redis.publish("kyoppie:reposts-timeline:"+token.user.id,repost.id)
    following.forEach(function(following) {
        redis.publish("kyoppie:reposts-timeline:"+following.fromUser,repost.id)
    })
    redis.publish("kyoppie:reposts-public_timeline",repost.id)
    redis.quit()
    return repost
}