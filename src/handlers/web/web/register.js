var main = require("../../../endpoints/web/register");

module.exports = function(req,res){
    main(req.body.screenName,req.body.password).then(function(r){
        res.send({result:true,response:r})
    },function(r){
        if(typeof r === "object"){
            console.log(r)
            res.send({result:false,error:"server-side-error"})
        } else {
            res.send({result:false,error:r})
        }
    })
}