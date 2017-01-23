module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        text:String,
        app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        files:[{type:mongoose.Schema.Types.ObjectId,ref:"files"}],
        favoriteCount:{type:Number,default:0}
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = async function (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        if (this.user.toResponseObject) obj.user=await this.user.toResponseObject(token)
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
        if (token) {
            obj.isFavorited = !!(await mongoose.model("favorites").findOne({user:token.user.id,post:this.id}))
        }
        obj.html = obj.text
        obj.html = obj.html.split('&').join("&amp;")
        obj.html = obj.html.split("<").join("&lt;")
        obj.html = obj.html.split(">").join("&gt;")
        // obj.html = obj.html.split('"').join("&quot;")
        obj.html = obj.html.split("\n").join("<br>")
        obj.html = obj.html.replace(/(^| |　)@([A-Za-z0-9_]+)/g,'$1<a href="/u/$2">@$2</a>')
        obj.html = obj.html.replace(/(https?:\/\/[a-zA-Z0-9-\.]+(:[0-9]+)?(\/?[a-zA-Z0-9-\._~\!#$&'\(\)\*\+,\/:;=\?@\[\]]*))/g,'<a href="$1" rel="nofollow" target="_blank">$1</a>')
        obj.html = obj.html.replace(/moz:\/\/a/,'<a href="https://www.mozilla.jp/">moz://a</a>')
        return obj
    }
    return mongoose.model("posts",schema)
}
