module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        post:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        if(this.user && this.user.toResponseObject) obj.user=this.user.toResponseObject();
        if(this.post && this.post.toResponseObject) obj.post=this.post.toResponseObject();
        return obj;
    }
    return mongoose.model("favorites",schema)
};