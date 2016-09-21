var redis = require("redis");
module.exports = function(){
    redis.createClient(6379,"localhost");
}