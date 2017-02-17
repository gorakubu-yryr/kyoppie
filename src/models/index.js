var mongoose = require("mongoose")
var fs = require("fs")
mongoose.connect("mongodb://"+(process.env.MONGO_HOST || "localhost")+"/"+(process.env.MONGO_DBNAME || "kyoppie_api"))
.catch(e => {
    console.error("Error: " + e.message)
    console.error("process will exit because of mongodb is dead.")
    process.exit()
})
var files = fs.readdirSync(__dirname)
var db={}
files.forEach(function(file) {
    var name = file.replace(".js","")
    if (name==="index") return
    db[name]=require(__dirname+"/"+name)(mongoose)
})
db["mongoose"] = mongoose
module.exports = db
