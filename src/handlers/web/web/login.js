var main = require("../../../endpoints/web/login");

module.exports = function(req,res){
    main(req.body.screenName,req.body.password).then(function(r){
        res.send({result:true,response:r.toResponseObject()})
    },function(r){
        if(typeof r === "object"){
            console.log(r)
            res.send({result:false,error:"server-side-error"},503)
        } else {
            res.send({result:false,error:r},400)
        }
    })
}