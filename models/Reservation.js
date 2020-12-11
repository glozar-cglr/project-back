const {Schema, model} = require("mongoose");

const reservationSchema = new Schema (
    {
        //aqui van mis atributos
        _property:{
            type: Schema.Types.ObjectId,
            ref:"Property",
            required:true
        },
        _guest:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        checkin:{
            type: Date,
            required: [true, "You must select a Check In date to book the property"]
        },
        checkout:{
            type: Date,
            required: [true, "You must select a Check Out date to book the property"]
        },
        guest_number:{
            type:Number,
            min: [1, "The minimum number of travellers per reservation is 1"]
        },
    },
    {timestamps:true}
);

module.exports = model("Reservation", reservationSchema)