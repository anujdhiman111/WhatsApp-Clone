const cookies = require('cookie-parser');
const { request } = require('express');
const jwt = require('jsonwebtoken');


module.exports = async (req,res,next) => {
    // console.log(req.headers.cookie.replace("access_token=",""))
    let token = req.headers.cookie.replace("access_token=","")
    let u = await jwt.verify(token,"ProCoder");
    if(u){
        console.log(u)
        req.user = u
        next();
    }
    else{
        res.send("Error Error");
    }
}