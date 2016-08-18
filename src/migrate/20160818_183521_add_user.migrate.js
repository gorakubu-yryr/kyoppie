var register = require("../endpoints/web/register")
exports.up = function(models){
    // write your migrate
    register("admin","admin")
}