var express = require('express');
var router = express.Router();
//import las cosas importantes
const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const {clearRes} = require('../utils/auth')


/* POST Singup --> Cómo hacer una ruta de manera express*/
router.post('/signup', (req, res, next) =>{
  //Trabajaré todo mi codigo por acá :) 
  const {name, email,password,confirmPassword} = req.body;

  if(password !== confirmPassword) return res.status(403).json({msg:"The writted passwords do not match"})

  bcrypt.hash(password,10).then((hashedPassword) => {
    const user = {
      name,
      email,
      password:hashedPassword
    };

    User.create(user).then(() => {
      res.status(200).json({msg:"The user has been successfully created!"})
    }).catch((err) => {
      res.status(400).json({msg:"There was an error", err})
    })
  })

}); 

/* POST login */ 
router.post("/login", (req,res,next) => {
  const {email,password} = req.body;
          //email:email
  User.findOne({email}).then((user) => {

    if(user == null) return res.status(403).json({msg:"The user does not exist"})

    bcrypt.compare(password,user.password).then((match) => {

      if(match){
        //borramos password para el usuario de esta forma
        //const withoutPass = user.toObject();
        //delete withoutPass.password

        //con un utils
        const newUser = clearRes(user.toObject())

        //esto nos genera un token mezclando un valaor (id) mas la palabra secreta y tiene una duración de un día!!
        const token = jwt.sign({id: user._id},process.env.SECRET, {
          expiresIn:"1d"
        });

        res.cookie("token", token, {
          expires:new Date(Date.now + 86400000),
          secure: false,
          httpOnly:true,
        }).json({user:newUser,code:200})
      } else {
        return res.status(401).json({msg:"The password does not exist"})
      }


    })

  }).catch((error) => {
    res.status(400).json({msg:"there was an error", error})
  })
});


router.post("/logout", (req,res,next) => {
  res.clearCookie("token").json({msg:"Come back soon!!"})
})







module.exports = router;
