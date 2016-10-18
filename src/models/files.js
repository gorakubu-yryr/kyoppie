module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        server:{type:mongoose.Schema.Types.ObjectId,ref:"file_servers"},
        host:String,
        path:String,
        type:String,
        isUse:Boolean,
        hash:String,
        isAdminDeleted:Boolean,
    },{
        timestamps:true
    })
    schema.methods.toResponseObject = function(){
        var obj = this.toObject();
        obj.id = this._id;
        obj._id = undefined;
        obj.__v = undefined;
        obj.server = undefined;
        if(!obj.isUse){
            obj.host = undefined;
            obj.path = undefined;
        } else if(obj.isAdminDeleted) {
            obj.url = obj.host+"/public/admin_deleted.png";
            obj.path = "/public/admin_deleted.png";
            obj.type = "image";
        } else {
            obj.url = obj.host+obj.path
        }
        return obj;
    }
    return mongoose.model("files",schema)
};