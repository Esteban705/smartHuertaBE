const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomesSchema = new Schema({
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: false
    },
    isSpecial: {
        type: Boolean,
        require: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
     }
});


const Homes = mongoose.model("Homes", HomesSchema);

module.exports = {Homes};

