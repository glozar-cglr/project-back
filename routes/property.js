const express = require('express');
const router = express.Router();
//import las cosas importantes
const Property = require("../models/Property")
const {veryToken} = require("../utils/auth")

/* GET property page.
    C.R.U.D
    C = Create,
    R = Read,
    U = Update,
    D = Delete
    Obtener todas las propiedades
    crear la propiedad
    eliminar || ||
*/

// RUTA PARA CREAR
router.post("/", veryToken, (req, res, next) => {
    //voy a sacar el id de la persona loggeada
    //para crear una propiedad (CASA)
    const { _id: _owner} = req.user

    Property.create({...req.body, _owner}).then((property) => {
        res.status(201).json({result:property})
    }).catch((err) => {
        res.status(400).json({msg:"Algo salio mal",err})
    })
})

//RUTA PARA LEER

router.get('/', veryToken, (req, res, next) => {
    Property.find(req.query)
        .populate("_owner", "email")  // <------ Populate
        .then((properties) => {
            res.status(200).json({result:properties})
        })
        .catch((err) =>{
            res.status(400).json({msg:"algo salió mal", err})
        })
});

//TRAER SOLO UNO

router.get('/:id', veryToken, (req, res, next) => {
    //req.params
    const {id} = req.params
    .populate("_owner", "email")  // <------ Populate
    Property.findById(id)
        .then((property) => {
            res.status(200).json({result:properties})
        })
        .catch((err) =>{
            res.status(400).json({msg:"Something went wrong", err})
        })
});

//Editar (update)
// post patch

router.patch("/:id", veryToken, (req,res,next) => {
    const {id} = req.params;
    Property.findByIdAndUpdate(id, req.body, { new : true })
        .populate("_owner", "email name profile_picture")
        .then((property) => {
            res.status(200).json({result:property})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

})

//delete

router.delete("/:id", veryToken, (req,res,next) => {
    const {id} = req.params;
    Property.findByIdAndRemove(id)
        .then((property) => {
            res.status(200).json({msg: "The user has been removed"})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

})

module.exports = router;
