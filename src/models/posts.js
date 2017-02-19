module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        text:String,
        app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        files:[{type:mongoose.Schema.Types.ObjectId,ref:"files"}],
        favoriteCount:{type:Number,default:0},
        replyTo:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
        repostTo:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
        repostCount:{type:Number,default:0}
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = async function (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        if (this.user.toResponseObject) obj.user=await this.user.toResponseObject(token)
        else {
            this.user = await mongoose.model("users").findById(this.user)
            if (this.user) obj.user = await this.user.toResponseObject(token)
        }
        if (this.app && this.app.toResponseObject) {
            obj.app=await this.app.toResponseObject(token)
            delete obj.app.appKey
            delete obj.app.appSecret
        }
        if (this.files && this.files.length) {
            for (let i=0;i<this.files.length;i++) {
                if (!this.files[i].toResponseObject) {
                    obj.files = []
                    break
                }
                obj.files[i] = await this.files[i].toResponseObject(token)
            }
        }
        if (token && !obj.repostTo) {
            obj.isFavorited = !!(await mongoose.model("favorites").findOne({user:token.user.id,post:this.id}))
            obj.isReposted = !!(await mongoose.model("posts").findOne({user:token.user.id,repostTo:this.id}))
        }
        if (this.replyTo && this.replyTo.toResponseObject) obj.replyTo = await this.replyTo.toResponseObject()
        if (obj.text) {
            obj.html = obj.text
            obj.html = obj.html.split('&').join("&amp;")
            obj.html = obj.html.split("<").join("&lt;")
            obj.html = obj.html.split(">").join("&gt;")
            // obj.html = obj.html.split('"').join("&quot;")
            obj.html = obj.html.split("\n").join("<br>")
            obj.html = obj.html.replace(/(^| |\u3000)@([A-Za-z0-9_]+)/g,'$1<a href="/u/$2">@$2</a>')
            obj.html = obj.html.replace(/(https?:)\/\/([a-zA-Z0-9-\.]+(:[0-9]+)?(\/?[a-zA-Z0-9-\._~\!#$&'\(\)\*\+,\/:;=\?@\[\]%]*))/g,function(match) {
                return ('<a href="'+match+'" rel="nofollow" target="_blank">'+match+'</a>').replace(/\/\//g,"&#x2F;&#x2F;")
            })
            obj.html = obj.html.replace(/moz:\/\/a/,'<a href="https:&#x2F;&#x2F;www.mozilla.org/">moz:&#x2F;&#x2F;a</a>')
        }
        if (obj.repostTo && this.repostTo.toResponseObject) obj.repostTo = await this.repostTo.toResponseObject(token)
        if (obj.repostTo) {
            delete obj.favoriteCount
            delete obj.repostCount
        }
        return obj
    }
    return mongoose.model("posts",schema)
}
