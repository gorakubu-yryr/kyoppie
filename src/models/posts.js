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
        if(this.files && this.files.length){
            for(let i=0;i<this.files.length;i++){
                if(!this.files[i].toResponseObject){
                    obj.files = [];
                    break;
                }
                obj.files[i] = this.files[i].toResponseObject();
            }
        }
        obj.html = obj.text;
        obj.html = obj.html.split('&').join("&amp;")
        obj.html = obj.html.split("<").join("&lt;")
        obj.html = obj.html.split(">").join("&gt;")
        // obj.html = obj.html.split('"').join("&quot;")
        obj.html = obj.html.split("\n").join("<br>")
        obj.html = obj.html.replace(/(^| |　)@([A-Za-z0-9_]+)/g,'$1<a href="/u/$2">@$2</a>');
        obj.html = obj.html.replace(/(https?:\/\/[a-zA-Z0-9-\.]+(:[0-9]+)?(\/?[a-zA-Z0-9-\._~\!#$&'\(\)\*\+,\/:;=\?@\[\]]*))/g,'<a href="$1" rel="nofollow" target="_blank">$1</a>');
        return obj;
    }
    return mongoose.model("posts",schema)
};
