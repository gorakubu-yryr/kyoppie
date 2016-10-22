var cluster = require('cluster');  
var express = require('express');  
var numCPUs = require('os').cpus().length;
 
if (cluster.isMaster) {
    if(numCPUs > 4) numCPUs = 4;
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    require("./main")
}