module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:String,
        server:{type:mongoose.Schema.Types.ObjectId,ref:"file_servers"},
    },{
        timestamps:true
    })
    return mongoose.model("files",schema)
};