module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        text:String,
        app:{type:mongoose.Schema.Types.ObjectId,ref:"apps"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
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
        return obj;
    }
    return mongoose.model("posts",schema)
};
