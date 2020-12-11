// esto nos va a servir para verificar si esxiste un usuario y un token

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.veryToken = (req,res,next) => {
    const {token} = req.cookies;

    jwt.verify(token,process.env.SECRET, (err,decoded) => {
        //aqui va nuestro codigo
        if(err) return res.status(401).json({msg:"It triggered the foollowing error message"})

        User.findById(decoded.id).then((user) => {
            //guardamos el usuario en el req.user para poder usarlo en cualquier lugar
            req.user = user;
            //con el next le defimos ya puedes seguir... literal
            next()
        })
    })
}

//haremos un middleware para checar roles y un utils para limpiar la respuesta de datos bausre

exports.checkRole = (roles) => {
    // (next) => 
    return(req,res,next) => {
        //{name:"Dylan", role: "USER"}
        const {role} = req.user;
        if(roles.includes(role)){
            return next()
        } else {
            return res.status(403).json({msg: "You're not authorized too make this change"})
        }
    }
}

//Limpiandoo el objeto

exports.clearRes = (data) => {
    //destructuramos el objeto "data" y retornamos un nuevo objeto, unicamente con 
    // los datoos requeridos para nuestro dev
    const {password,__v,createdAt,updatedAt,...cleanedData} = data;

    return cleanedData
}