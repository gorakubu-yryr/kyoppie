module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        post:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = async function (token) {
        var obj = this.toObject()
        obj.id = this._id
        obj._id = undefined
        obj.__v = undefined
        if (this.user && this.user.toResponseObject) obj.user=await this.user.toResponseObject(token)
        if (this.post && this.post.toResponseObject) obj.post=await this.post.toResponseObject(token)
        return obj
    }
    return mongoose.model("favorites",schema)
}