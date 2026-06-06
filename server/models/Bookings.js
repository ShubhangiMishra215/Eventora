const mongoose = require('mongoose');

const bookingScehma = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true,
    },
    status:{
       type: String,          
        default: 'pending',     
                enum: ['pending', 'confirmed', 'cancelled'],
    },
    paymentStatus:{
        type:String,
        enum:['not_paid','paid'],
        default:'not_paid',
    },
    amount:{
        type:Number,
        required:true,
    }
}, {timestamps:true})

module.exports = mongoose.model('Booking',bookingScehma);