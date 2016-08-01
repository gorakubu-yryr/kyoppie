var mongoose = require("mongoose");
var fs = require("fs")
mongoose.connect("mongodb://localhost/kyoppie_api")
var files = fs.readdirSync(__dirname);
var db={}
files.forEach(function(file){
    var name = file.replace(".js","")
    if(name==="index") return;
    db[name]=require(__dirname+"/"+name)(mongoose)
})
db["mongoose"] = mongoose
module.exports = db