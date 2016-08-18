var main = require("../../endpoints/index");

module.exports = function(req,res){
    main().then(function(r){
        res.send({result:true,response:r})
    },function(r){
        if(typeof r === "object"){
            res.send({result:false,error:"server-side-error"})
        } else {
            res.send({result:false,error:r})
        }
    })
}