var express = require("express")
var app = express();

var routes = require("./routes")
routes.forEach(function(route){
    var login = true;
    if(route.login !== undefined) login = route.login;
    var method = route.method;
    var path = route.name;
    app[method](path,require("./handlers/web"+path));
})

app.listen(4005,function(){
    console.log("listen for 4005 port");
})