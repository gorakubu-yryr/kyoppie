var redis = require("redis")
module.exports = function() {
    return redis.createClient(6379,process.env.REDIS_HOST || "localhost")
}