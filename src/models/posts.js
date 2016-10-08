module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        text:String,
        app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        files:[{type:mongoose.Schema.Types.ObjectId,ref:"files"}]
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        if(this.user.toResponseObject) obj.user=this.user.toResponseObject();
        if(this.app && this.app.toResponseObject){
            obj.app=this.app.toResponseObject();
            delete obj.app.appKey;
            delete obj.app.appSecret;
        }
        obj.text_html = obj.text;
        obj.text_html = obj.text_html.split('&').join("&amp;")
        obj.text_html = obj.text_html.split("<").join("&lt;")
        obj.text_html = obj.text_html.split(">").join("&gt;")
        // obj.text_html = obj.text_html.split('"').join("&quot;")
        obj.text_html = obj.text_html.split("\n").join("<br>")
        obj.text_html = obj.text_html.replace(/(^| |　)@([A-Za-z0-9_]+)/g,'$1<a href="/u/$2">@$2</a>');
        obj.text_html = obj.text_html.replace(/(https?:\/\/[a-zA-Z0-9-\.]+(:[0-9]+)?(\/?[a-zA-Z0-9-\._~\!#$&'\(\)\*\+,\/:;=\?@\[\]]*))/g,'<a href="$1" rel="nofollow" target="_blank">$1</a>');
        
        return obj;
    }
    return mongoose.model("posts",schema)
};
