const express = require('express');
const router = express.Router();
//import las cosas importantes
const Reservation = require("../models/Reservation")
const {veryToken} = require("../utils/auth")



//Rutas para leer
// Todas las reservaciones por usuario
router.get('/', veryToken, (req, res, next) => {
    const {_id} = req.user;
    Reservation.find({_guest:_id})
        .then((reservations) => {
            res.status(200).json({result:reservations})
        })
        .catch((err) =>{
            res.status(400).json({msg:"algo salió mal", err})
        })
});


//Trae todas las reservaciones por propiedad

router.get('/property/:property_id', veryToken, (req, res, next) => {
    const {property_id} = req.params;
    Reservation.find({_property: property_id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"property",
            populate:{
                path:"_owner",
                select: "name",
            },
        }) //<----- Populate
        .then((reservation) => {
            res.status(200).json({result:reservation})
        })
        .catch((err) =>{
            res.status(400).json({msg:"algo salió mal", err})
        })
});

//Create reservation


router.post("/",veryToken, (req,res,next) => {

    const {_id:_guest} = req.user;
    const reservation = {...req.body, _guest}

    Reservation.create(reservation)
        .populate("_guest","name") //<----- Populate
        .then((reservation) => {
            res.status(200).json({result: reservation})
        })
        .catch((err) => {
        res.status(400).json({msg:"algo salió mal", err})
    })
})

//Update!!!

router.patch("/:id", veryToken, (req,res,next) => {
    const {id} = req.params;
    Reservation.findByIdAndUpdate(id, req.body, { new : true })
        .then((reservation) => {
            res.status(200).json({result:reservation})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

});

//Delete

router.delete("/:id", veryToken, (req,res,next) => {
    const {id} = req.params;
    Reservation.findByIdAndDelete(id)
        .then((reservation) => {
            res.status(200).json({msg: "The user has been removed"})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

})






module.exports = router;