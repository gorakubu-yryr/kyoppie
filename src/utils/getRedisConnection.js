var redis = require("redis");
module.exports = function(){
    return redis.createClient(6379,"localhost");
}