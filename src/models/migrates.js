module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        name:String,
    },{
        timestamps:true
    })
    return mongoose.model("migrates",schema)
};