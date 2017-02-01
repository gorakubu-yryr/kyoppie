var cluster = require('cluster')
var numCPUs = require('os').cpus().length
 
if (cluster.isMaster) {
    if (numCPUs > 4) numCPUs = 4
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    require("./main")
}

cluster.on('exit', worker => {
    console.log(`worker process ${worker.process.pid} died. restarting...`)
    cluster.fork()
})