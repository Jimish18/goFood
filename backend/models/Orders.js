const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    email : 
    {
        type : String
    }
    ,
    order_data :
    // [
    //     {
    //         id : String,
    //         img : String,
    //         name : String,
    //         price :Number,
    //         qty : Number,
    //         size : String
    //     }
    // ]
    {
        type : Array
    }
})

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;