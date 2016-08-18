function printHowToUseEnd(){
    console.log("HOW TO USE:")
    console.log("  node "+process.argv[1]+" [COMMAND] [name]")
    console.log("COMMAND:")
    console.log("  run - run migrate (default:all)")
    console.log("  new - create migrate")
    process.exit(1)
}
if(process.argv.length < 3 || process.argv.length > 4) printHowToUseEnd();
var fs = require("fs")
var moment = require("moment")
var models = require("../models")
switch (process.argv[2]) {
    case "run":
        // ディレクトリのファイル一覧を取得
        var files = fs.readdirSync(__dirname).filter(function(file){
            return fs.statSync(__dirname+"/"+file).isFile() && /.*\.migrate\.js/.test(file);
        });
        var loop=0;
        function startMigrate(){
            function next(){
                loop++;
                startMigrate();
            }
            if(files.length <= loop){
                console.log("end migrate")
                process.exit();
                return;
            }
            var file = files[loop];
            console.log("start",file)
            models.migrates.findOne({name:file},function(err,res){
                if(res) return next();
                var migrate = require(__dirname+"/"+file);
                migrate.up();
                var mobj = new models.migrates({name:file});
                mobj.save(function(){
                    console.log("migrate up:"+file)
                    next();
                })
            })
        }
        startMigrate();
        break;
    case "new":
        var name = process.argv.length === 4 ? process.argv[3] : "no_name"
        var filename = moment().format("YYYYMMDD_HHmmss")+"_"+name+".migrate.js";
        var file = fs.openSync(__dirname+"/"+filename,"w");
        fs.writeSync(file,"exports.up = function(models){\n    // write your migrate\n}")
        fs.closeSync(file);
        console.log("writed at "+filename);
        process.exit();
        break;
    default:
        printHowToUseEnd();
        process.exit();
        break;
}