module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        post:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function* (token){
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        if(this.user && this.user.toResponseObject) obj.user=yield this.user.toResponseObject(token)
        if(this.post && this.post.toResponseObject) obj.post=yield this.post.toResponseObject(token)
        return obj
    }
    return mongoose.model("favorites",schema)
}