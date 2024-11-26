const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const verfyToken = async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message:"Unauthorized access"});
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_JWT_TOKEN,(error,decoded)=>{
        if(error){
            return res.status(401).send({message : "Invalid Token"});
        }
        req.decoded = decoded;
        next();
    })
}

module.exports = verfyToken;

