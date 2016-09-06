module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        text:String,
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        console.log(obj.user)
        return obj;
    }
    return mongoose.model("posts",schema)
};
