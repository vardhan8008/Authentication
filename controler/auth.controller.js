const jwt = require("jsonwebtoken")
exports.isAuthenticated = function(req,res,next){
    var token = req.get("authorization")
    if(token){
        //verfied function jwt
        try{
           
            var decoded = jwt.verify(token, 'mysecretkey');
            console.log(decoded)
            next()
        }
        catch(e){
            console.log("Error is  ..",e)
            res.status(401).send()
        }
       
    }
    else{
        res.status(401).send()
    }
}