//opción 1: 
    const mongoose = require('mongoose');
    // const Schema = mongoose.Schema;
    const {Schema} = mongoose;

//opción 2
    //const {Schema, model} = require("mongoose");

const propertySchema = new Schema (
    {
        //Tendremos que poner algunos detalles com title, address, price, images, owner (number of Rooms, fechasDisponibilidad... etc etc)
        _owner: {
            //Esto es para decirle que insertará un id de un elemento de la base de datos
            type:Schema.Types.ObjectId,
            ref: "User",
            required: [true, "The property must have an owner"]
        },
        //sigues los atributos noormales
        title: {
            type:String,
            required:[true,"You must provide a title in the property"],
        },
        address: {
            type:String,
            required:[true,"You must provide an address in the property"]
        },
        description: {
            type:String,
            minlength:[50,"The description should be longer"]
        },
        images: {
            type: [String],
            minglength: [1, "You must pick at least 1 image per property"]
        },
        price: {
            type: Number,
            min: [1, "Properties cannot be offered for free"],
            required: [true, "You must add a price to your property"]
        },
        capacity: {
            type:Number,
            required: [true,"You must add a capacity too the property"]
        }
    },
    {timestamps:true}
);


//Esto es muy importante
module.exports = mongoose.model("Property", propertySchema)

//export usando la opción 2:
// module.exports = model("Property", propertySchema)