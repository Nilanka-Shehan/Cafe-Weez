const mongoose = require("mongoose");
const {Schema} = mongoose;

const menuItems = new Schema ({
    name : {
        type : String,
        trim : true,
        required : true,
        minlength : 3,
    },
    image : {
        type : String,
        required : true,
    },
    category : String,
    price : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Menus = mongoose.model("Menu",menuItems);
module.exports = Menus;